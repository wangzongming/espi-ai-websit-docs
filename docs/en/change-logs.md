# Change Logs

## 2024-07-20

#### Server v1.13.2

- 🆕 Added callback after speech recognition is complete.
- 🆕 Added vad_eos speech recognition silence time configuration.
- 🤔 Refactored TTS plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Refactored IAT plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Refactored LLM plugin parameters, separating any framework-coupled concepts (greatly reducing plugin encapsulation difficulty).
- 🤔 Extended the silence time when the user is not speaking.
- 💄 Improved error prompts for some configurations.
- 🐞 Fixed an issue where the first wake-up might prevent subsequent wake-ups.
- 🐞 Fixed potential confusion during conversations.

#### Client v1.0.0

- 🤔 Changed the parameter types of `esp_ai.onEvent()` to `String` for easier usage (e.g., directly using `==` to judge commands).
- 💄 Improved voice wake-up accuracy.

## 2024-07-13

- 🆕 Added plugin development functionality, supporting custom plugins for the server.
- 🆕 Added client speaker sampling rate configuration.
- 🆕 Added Dolphin voice-over plugin `TTS`, supporting various voice tones. For details, see: https://www.ttson.cn/
- 💄 Improved audio stream splitting to reduce client speaker noise.
- 💄 Improved conversation fluency.
- 💄 Added a prompt sound before Xiao Ming listens.

## 2024-07-09

#### v1.0.0

- ✨ Refactored client code to header file format.
- 🆕 Added Volcano Engine `TTS` integration.
- 🐞 Fixed an error when calling non-3.5 versions of `iFLYTEK LLM`.
- 🐞 Fixed some server bugs.

## 2024-07-01

#### v0.0.1

- 🆕 Released the test version.