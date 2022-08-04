const express = require("express")
const { neueAnfrage } = require("../use-cases/add-newRequest");
const { sendMail } = require("../use-cases/send-mail");
const { sendMailtoself } = require("../use-cases/send-mailtoself");
const { body, validationResult } = require('express-validator');

const emailRouter = express.Router()

emailRouter.post("/neueanfrage", body('name').isLength({ min: 1, max: 70 }), body('email').isEmail(), body('text').isLength({ min: 3 }), (req, res) => {
    const errors = validationResult(req)

    if (!req.body || !errors.isEmpty()) {
        res.status(400).json({ error: "Please include content." })
        return;
    }

    const Anfrage = {
        email: req.body.email,
        name: req.body.name,
        datumDerAnfrage: Date.now(),
        text: req.body.text
    }

    sendMail({
        to: Anfrage.email,
        subject: "Deine Nachricht hat uns erreicht. Dankeschön",
        message: `
                    Hallo ${Anfrage.name},
            
                    vielen Dank für deine Nachricht. 
            Wir melden uns in Kürze bei dir.
            
                 Bis dahin wünschen wir dir eine angenehme Zeit
                   Deine Eigenheimer `
    }
    )

    sendMailtoself({
        to: "werthmannsupercode@gmail.com",
        subject: "Neue Anfrage über Kontaktformular",
        message: `Neue Anfrage von: ${Anfrage.name}

        Von Adresse: ${Anfrage.email}

        Nachricht: 

        ${Anfrage.text}`
    })

    neueAnfrage(Anfrage)
        .then(addedRequest => res.status(201).json(addedRequest))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Failed to add request to database." })
        })
})

module.exports = {
    emailRouter
}