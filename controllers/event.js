const Event = require("../models/event")
const Response = require("../utils/response")
const Building = require("../models/building")
const PersonStranded = require("../models/person_stranded")
const { getMessaging } = require("firebase/messaging")
const Firefighter = require("../models/firefighter")
const User = require("../models/user")
const admin = require("firebase-admin");
const serviceAccount = require("../phoenix-ace-firebase-adminsdk-91qcz-d349971e3b.json");

const createEvent = async (req, res) => {
    try {
        const {building_id, notifyPeople, assignFirefighter} = req.body
        const event = new Event({
            building_id
        })
        await event.save()
        if(notifyPeople) {
            await notifyPeopleInBuilding(building_id, event._id)
        }
        if(assignFirefighter) {
            await assignFirefighterToBuilding(building_id, event)
        }
        Response.sendSuccessMessage(res, "Event created successfully", event)
    } catch (error) {
        Response.sendErrorMessage(res, 400, error)
    }
}

const createEventInternal = async (building_id, notifyPeople, assignFirefighter) => {
        const event = new Event({
            building_id
        })
        await event.save()
        if(notifyPeople) {
            await notifyPeopleInBuilding(building_id, event._id)
        }
        if(assignFirefighter) {
            // await assignFirefighterToBuilding(building_id, event)
        }
        console.log("Event created successfully")
}

const assignFirefighterToBuilding = async (building_id, event) => {
    // load the building from building_id, get its city, find firefighters who are in that city, assign them to the event

    const firefighter =  await Firefighter.findOne({isActive: true})

    if(!firefighter) {
        return
    }

    event.firefighter = firefighter._id
    await event.save()
    firefighter.isActive = false
    await firefighter.save()

    const message = {
        data: {
            event_id: event._id,
            building_id: building_id
        },
        token: firefighter.fcmKey
    }

    await firebaseApp.getMessaging().send(message)
}

const notifyPeopleInBuilding = async (building_id, event_id) => {
    // load the building from building_id, get its city, find users who live in that city, use their fcm key to send them a notification
    const building = await Building.findById(building_id)
    const building_city = building.address

    const users =  await User.find({city: building_city})
    console.log(users)
    var fcmKeys = []
    for(let i=0; i<users.length; i++) {
        const personStranded = new PersonStranded({
            user_id: users[i]._id,
            building_id,
            event_id,
            hasExited: false
        })
        await personStranded.save()
        /*
        const token = fcmKeys[i]
        const url = "https://fcm.googleapis.com/fcm/send"
        const response = await fetch(url, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "key=AAAABhP74nA:APA91bGG062DaGOvxxPpE5jZ0LTAc4V9pvb4XznDpcE42WxKyJKmJdH8KpsEKJqfxlQXI5ZLXQgnxb_UJ--ytF2cZILK8TEW9ZSF059vvUXg42P8xJg71s4sCDMGmaKcgFH1g5J3RsqA"
            },
            body: JSON.stringify({
                "to": token,
                "notification": {
                    "title": "Building Fire!",
                    "body": building.location,
                    "mutable_content": true,
                    "sound": "Tri-tone"
                    },
               "data": {
                "latlng": building.location,
                "dl": "<deeplink action on tap of notification>"
                  }
            }) // Stringify the data object into JSON format
          });
        */

          const body = {
            "to": users[i].fcmKey,
            "data": {
                "latlng": building.location,
                "peronStranded": personStranded._id
            }
          };

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'key=AAAABhP74nA:APA91bGG062DaGOvxxPpE5jZ0LTAc4V9pvb4XznDpcE42WxKyJKmJdH8KpsEKJqfxlQXI5ZLXQgnxb_UJ--ytF2cZILK8TEW9ZSF059vvUXg42P8xJg71s4sCDMGmaKcgFH1g5J3RsqA'
            },
            body: JSON.stringify(body)
          };
          
          fetch('https://fcm.googleapis.com/fcm/send', options, 20000)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}

module.exports = {createEvent, createEventInternal}