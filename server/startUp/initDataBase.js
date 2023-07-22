const placesMock = require("../mock/places.json")
const Places = require("../models/Places")
const sizesMock = require("../mock/sizes.json")
const Sizes = require("../models/Sizes")
const stylesMock = require("../mock/style.json")
const Styles = require("../models/Styles")
const tatooseMock = require("../mock/tatoos.json")
const Tatoos = require("../models/Tatoose")
const mastersMock = require("../mock/masters.json")
const Masters = require("../models/Masters")

module.exports = async () => {
    const places = await Places.find()

    if (placesMock.length !== places.length) {
        await createInitialEntity(placesMock, Places)
    }

    const sizes = await Sizes.find()

    if (sizesMock.length !== sizes.length) {
        await createInitialEntity(sizesMock, Sizes)
    }

    const styles = await Styles.find()

    if (stylesMock.length !== styles.length) {
        await createInitialEntity(stylesMock, Styles)
    }

    const tatoos = await Tatoos.find()

    if (tatooseMock.length > tatoos.length) {
        await createInitialEntity(tatooseMock, Tatoos)
    }
}

async function createInitialEntity(mock, Model) {
    await Model.collection.drop()
    return Promise.all(
        mock.map(async (item) => {
            try {
                const newItem = new Model(item)
                
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}