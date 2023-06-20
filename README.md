# tauri-minimal-repro
Minimal reproduction of window dragging preventing window size to be set

1. Run ``` npm i ``` to install dependencies
2. Run ``` npm run dev ``` to start the app in dev mode
3. Click the RESIZE button, this will prompt a resize in 2 seconds and a refresh of the current / wanted sizes in 3 seconds
4. Once clicked, quickly start dragging the window on your screen by holding on the top bar. Moving the screen quickly in any direction will prevent the setSize to go through. It's visible as there'll be a difference between the wanted and current window's height and width
5. To see the expected behavior only click the resize button without dragging the window
