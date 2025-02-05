---
title: Introduction to ESP - AI
createTime: 2024/11/7 21:06:45
permalink: /en/guide/intro/
--- 

## What is ESP - AI?
`ESP - AI` provides a full - set of AI dialogue solutions for your development board, including but not limited to the integrated solution of `IAT(ASR)+LLM+TTS` for the `ESP32` series of development boards. It can be injected into projects in a dependent manner without affecting existing projects.

Why do we say "including but not limited to" the `ESP32` development board? Even if you are using another development board, you can use the `ESP32` to build an `AI` service based on this project and use serial communication to send commands or conversations to your other development board.

## What can ESP - AI do?
Imagine a scenario where you have a robot that can perform some fixed actions, but you want to communicate with it and make it understand some of your commands. If you were to implement this process from scratch, you would start by collecting the audio stream from the microphone and then get into endless debugging...

Now, with `ESP - AI`, you don't have to do this. All you need to do is introduce `ESP - AI`. Processes such as **off - line voice wake - up, speech recognition, large language model calls, text - to - speech conversion, and speaker audio output** have already been implemented for you. Moreover, `ESP - AI` uses a plugin - based design framework, and each of the above steps provides an extension method, allowing you to customize your product at will.

## How to learn ESP - AI?
[**Ordinary Users**] If you have no knowledge of software or hardware but have certain hands - on skills and want to connect your device to AI dialogue, please directly use the [ESP - AI Open Platform](https://dev.espai.fun/). Directly refer to the [ESP - AI Open Platform Tutorial](/example/10ild3e1/).
[**Developers**] Please read through "Development Guide / Quick Start" & "Development Guide / Usage Tutorial" to get started, and then read through all other articles.

The open platform provides free services. You only need to configure the secret key on the network configuration page to connect to the open platform service. The hardware code developed by developers themselves can also connect to the open platform.

## ESP - AI Technology Stack
- **In terms of software**: The server - side code of this project is based on `Nodejs`, and the hardware code is based on `Arduino`. Although the server - side is developed based on `Nodejs`, it also provides the ability to write plugins in other programming languages. For details, see the plugin development section.
- **In terms of hardware**: This project mainly runs on development boards of the `ESP` series.

## Features
- ✔️ Open ecosystem, open - source code.
- ✔️ Customizable off - line voice wake - up words, with multiple built - in wake - up methods (built - in, voice, button, serial port, Tianwen ASRPro).
- ✔️ Complete dialogue chain: IAT(ASR) ➡️ LLM/RAG ➡️ TTS.
- ✔️ Support for conversation interruption.
- ✔️ Fast response algorithms for TTS/LLM. Try to respond to users as quickly as possible while considering service costs.
- ✔️ Intelligent recognition of user commands (home appliance control, audio playback), and can respond to commands dynamically according to the context. Also supports custom logic/character matching and other ways to recognize user intentions.
- ✔️ Configurable.
- ✔️ Plug - in architecture, allowing you to write plugins to access any LLM/TTS/IAT.
- ✔️ C/S architecture, meaning you can manage each device, including independently allocating a set of configurations for each client (hardware).
- ✔️ Complete authentication rules.
- ✔️ Full - chain streaming data interaction.
- ✔️ The developer platform provides: free services, visual configuration...
- ✔️ Highly customizable (the network configuration page and various details are fully provided for modification).
- ✔️ Can easily handle high - concurrency scenarios (needs to be used with Nginx for load balancing).
- ✔️ Ready - to - use.