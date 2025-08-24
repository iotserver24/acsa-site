# Satellite Model Setup Guide

## Downloading the Sketchfab Satellite Model

To use the high-quality satellite model from Sketchfab, follow these steps:

### 1. Download the Model
1. Visit: https://sketchfab.com/3d-models/satellites-1dfb3bb50daa4f6f94fdcad1321ce50f
2. Click the "Download 3D Model" button
3. Choose the **glTF (.glb)** format
4. Download the file

### 2. Place the Model
1. Rename the downloaded file to `satellite-model.glb`
2. Place it in the `public/` folder of your project
3. Replace the existing placeholder file

### 3. Model Features
- **High-quality 3D satellite model** with realistic details
- **Automatic orbital animation** around the Earth
- **Proper scaling and positioning** for the scene
- **Fallback to built-in satellite** if model fails to load

### 4. Attribution
When using this model, please provide proper attribution to the original creator on Sketchfab.

## Current Implementation

The Earth scene now includes:
- ✅ **Single satellite** orbiting around the Earth
- ✅ **GLTF model support** for high-quality 3D models
- ✅ **Fallback satellite** if external model fails to load
- ✅ **Smooth orbital animation** with proper orientation
- ✅ **Error handling** for missing model files

## File Structure
```
public/
├── satellite-model.glb    # Place the downloaded model here
├── earth-texture.jpg      # Earth texture
└── ...

components/
├── earth-scene.tsx        # Main Earth scene
├── gltf-satellite.tsx     # GLTF satellite component
└── ...
```

## Next Steps
1. Download the satellite model from Sketchfab
2. Place it in the `public/` folder
3. The scene will automatically use the high-quality model
4. If the model is missing, it will fall back to the built-in satellite


