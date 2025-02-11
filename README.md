# Wambi Platform Tokens (managed in Figma)

This repository holds themes for different clients present in the Wambi platform. Changes must be made in Figma and pushed to GitHub.

## Theme Generation Steps
- Themes are added or modified in Figma
- They are uploaded to the main branch in GitHub
- A GitHub Action runs to convert the themes.json file into valid json files for each client
- The content of the client files can be copied straight into the config column of the clientConfig table