const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Wasi_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function WASI_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Wasi_Tech = Wasi_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Wasi_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Wasi_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id, { text: '' + b64data });
	
				   let WASI_MD_TEXT = `
┏━━━━━━━━━━━━━━
┃𝐋𝐀𝐃𝐋𝐀-𝐌𝐀𝐋𝐈𝐊-𝐌𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐈𝐃 
┃𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘
┃𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ✅🔥
┗━━━━━━━━━━━━━━━
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
1️⃣ || 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 = 𖥘 👑Laڈla🔥Maلik✨🎭 𖥘
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
2️⃣ || 𝐖𝐡𝐚𝐭𝐭𝐬𝐀𝐩𝐩 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 = https://whatsapp.com/channel/0029VaahtfyIiRp2w1s5D22U
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
3️⃣ ||𝐎𝐖𝐍𝐄𝐑 𝐍𝐔𝐌𝐁𝐄𝐑 = 923705807807
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𒁂𓄂❥𝙄𝙩𝙭•𝙇𝙖ڈ𝙡𝙖💥𝙈𝙖ل𝙞𝙠༽༼гՇ࿐ ♡*
_____________________________________
_𝐃𝐨𝐧'𝐭 𝐅𝐨𝐫𝐠𝐞𝐭 𝐓𝐨 𝐆𝐢𝐯𝐞 𝐒𝐭𝐚𝐫 𝐓𝐨 𝐌𝐲 𝐑𝐞𝐩𝐨_`
	 await Qr_Code_By_Wasi_Tech.sendMessage(Qr_Code_By_Wasi_Tech.user.id,{text:WASI_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					WASI_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await WASI_MD_QR_CODE()
});
module.exports = router
