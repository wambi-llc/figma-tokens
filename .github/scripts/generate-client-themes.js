const fs = require('fs')
const path = require('path')

const tokensPath = path.join(__dirname, '../../tokens.json')
const clientsFolder = path.join(__dirname, '../../clients')

// Define the mapping of parent names to output filenames...KA
const clientMappings = {
  'Wambi Recolor': 'wambi.json',
  'IU Recolor': 'iu.json',
  'Stanford Recolor': 'stanford.json',
  'VA Recolor': 'va.json',
  'GSAM Recolor': 'gsam.json',
}

// Ensure clients folder exists, if not create one...KA
if (!fs.existsSync(clientsFolder)) {
  fs.mkdirSync(clientsFolder)
}

// Read and process tokens.json...KA
try {
  const rawData = fs.readFileSync(tokensPath, 'utf-8')
  const tokens = JSON.parse(rawData)

  Object.entries(clientMappings).forEach(([clientKey, outputFileName]) => {
    if (tokens[clientKey]) {
      const clientData = tokens[clientKey]

      const cleanedData = {
        colors: clientData,
        shadows: clientData.shadows,
      }

      delete cleanedData.colors.shadows

      // Save processed data to the client file...KA
      const outputFilePath = path.join(clientsFolder, outputFileName)
      fs.writeFileSync(outputFilePath, JSON.stringify(cleanedData, null, 2), 'utf-8')
      console.log(`✅ Processed and saved: ${outputFileName}`)
    } else {
      console.warn(`⚠️ Warning: No matching data found for "${clientKey}" in tokens.json`)
    }
  })

  console.log('🎉 Processing complete!')
} catch (error) {
  console.error('❌ Error processing tokens.json:', error)
  process.exit(1)
}
