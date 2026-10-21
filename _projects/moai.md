---
title: Vision-Language Models as Success Detectors for Data Collection
order: 3
org: MoAI Lab, SeoulTech
role: Undergraduate Researcher
period: Dec 2025 – Aug 2026
summary: A quantized Qwen model on a Jetson Thor labels Unitree G1 humanoid rollouts as success or failure, keeping only the episodes worth learning from.
tags:
  - Qwen
  - Vision-Language Models
  - Jetson Thor
  - vLLM
thumbnail: /assets/moai-photo.png
description: A Qwen-based VLM pipeline on a Jetson Thor that labels Unitree G1 humanoid rollouts as success or failure, MoAI Lab at SeoulTech.
media_layout: grid
media:
  - /assets/moai-photo.png
---
A policy trained on a few dozen demonstrations succeeds sometimes and fails often, and someone has to sort the resulting episodes before they can be reused for training. Working on a Unitree G1 humanoid, I built a pipeline that hands that judgment to a vision-language model instead. A quantized Qwen model runs on a Jetson Thor next to the robot and labels each rollout as success, failure, or too ambiguous to call, keeping only the episodes worth learning from.

How the question is posed matters more than I expected. Giving the model a reference image of the finished task, rather than describing success in words, made its verdicts markedly more reliable. The model can also state why an episode failed, which turns rejected data into something diagnostic rather than discarded.
