const fs = require('fs')
const path = require('path')

const tokensPath = path.join(__dirname, '../../tokens.json')
const clientsFolder = path.join(__dirname, '../../clients')

// Define the mapping of parent names to output filenames...KA
const clientMappings = {
	'Wambi Recolor': [1, 2, 3, 4, 5, 6, 7, 12, 14, 17, 18, 19, 20, 23, 24, 25, 26, 30, 48, 50],
	'IU Recolor': [3, 31],
	'Stanford Recolor': 32,
	'VA Recolor': 35,
	'GSAM Recolor': [40, 43],
	'NKCH Recolor': 39,
	'NCH Recolor': 47,
	'Cedars Sinai Recolor': 41,
	'Novant Recolor': 45,
	'UTMB Recolor': [46, 49],
	'Northwell Recolor': [42, 44],
	'TGH Recolor': 51,
}

// Ensure clients folder exists, if not create one...KA
if (!fs.existsSync(clientsFolder)) fs.mkdirSync(clientsFolder)

// Read and process tokens.json...KA
try {
	const rawData = fs.readFileSync(tokensPath, 'utf-8')
	const tokens = JSON.parse(rawData)

	Object.entries(clientMappings).forEach(([clientKey, outputFileNames]) => {
		if (tokens[clientKey]) {
			const clientData = tokens[clientKey]

			// Create a copy of clientData for colors, excluding shadows...KA
			const colors = { ...clientData }
			if (colors.shadows) delete colors.shadows

			const cleanedData = {
				colors,
				shadows: clientData.shadows || {},
			}

			// Save processed data to the client file...KA
			const filesToProcess = Array.isArray(outputFileNames) ? outputFileNames : [outputFileNames]

			filesToProcess.forEach((outputFileName) => {
				const outputFilePath = path.join(clientsFolder, `${outputFileName}.json`)
				fs.writeFileSync(outputFilePath, JSON.stringify(cleanedData, null, 2), 'utf-8')
				console.log(`✅ Processed and saved: ${outputFileName}`)
			})
		} else {
			console.warn(`⚠️ Warning: No matching data found for "${clientKey}" in tokens.json`)
		}
	})

	console.log('🎉 Processing complete!')
} catch (error) {
	console.error('❌ Error processing tokens.json:', error)
	process.exit(1)
}
