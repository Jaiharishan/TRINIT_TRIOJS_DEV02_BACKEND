const cron = require('node-cron')
const nodemailer = require('nodemailer')
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const fs = require('fs')
const Org = require('./DB/models/organisations')
const Bug = require('./DB/models/bugs')


// Incomplete


// Mails every month
// cron.schedule('0 0 1 * *', async() => {
try {
    const run = async() => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // Get all head Id with org details
        const orgDetails = await Org.find({}).populate('head bugs')
        orgDetails.map(async(org) => {
            const totalMembers = org.rank1.length + org.rank2.length;
            const totalBugs = org.bugs.length;
            const totalClosedBugs = await Bug.find({ status: 'closed', orgId: org._id })
            const bugCount = totalClosedBugs.length;

            // pdf name time date.now()
            let pdffileName = Date.now() + '.pdf'
            doc.addPage()
            doc.pipe(fs.createWriteStream(pdffileName));
            doc.fontSize(25)
                .text(`Dear ${org.head.userName},
                Your monthly report for organisation ${org.name}.
                Total members - ${totalMembers}.
                Rank1 - ${org.rank1.length}
                Rank2 - ${org.rank2.length}
                Total bugs - ${totalBugs}
                Bugs closed - ${bugCount}
                `, 100, 100)
            doc.end();
            const mailOptions = {
                from: process.env.senderMail,
                to: org.head.email,
                // to: "downdkar@gmail.com",
                subject: "Monthly report - TRIOJS",
                text: "Check out this attached pdf file",
                attachments: [{
                    filename: "report.pdf",
                    path: __dirname + pdffileName,
                    contentType: 'application/pdf'
                }]
            }
            const info = transporter.sendMail({
                mailOptions,
                function(error, info) {
                    try {
                        console.log(info)
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        })
    }
    run();

} catch (err) {
    console.log(err.message)
}

// })
module.exports = cron;