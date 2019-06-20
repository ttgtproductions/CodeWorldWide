const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');

const creds = require('./client_secret.json');

function printSkill(skill) {
	console.log(`Skill: ${skill.skill}`);
	console.log(`Level: ${skill.level}`);
	console.log(`Years of Usuge: ${skill.years}`);
	console.log(`Industry: ${skill.industry}`);
	console.log(`Company: ${skill.company}`);
	console.log(`Position: ${skill.position}`);
	console.log('------------');
}


async function accessSpreadsheet() {
	const doc = new GoogleSpreadsheet('10DWZ2he-QT3NjjuNSUKFHCmIn75QVJb4DWt-jy-R8jw');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];
	
	const rows = await promisify(sheet.getRows)({
		offset: 1
	});
	
	rows.forEach(row => {
		printSkill(row);
	})
}

accessSpreadsheet();