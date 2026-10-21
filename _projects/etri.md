---
title: Sim-to-Real Fine-tuning of Vision-Language-Action Models
order: 2
org: Field Robotics Laboratory, ETRI
role: Research Internship
period: Jul – Aug 2026
summary: Fine-tuned π0 and GR00T N1.5 on Isaac Sim demonstrations, deployed them on a physical SO-101 arm, and traced why 80% success in simulation fell to about 30% on the real robot.
tags:
  - π0
  - GR00T N1.5
  - Isaac Sim
  - SO-101
thumbnail: /assets/video/etri-sim.mp4
description: Fine-tuning π0 and GR00T N1.5 on Isaac Sim demonstrations and deploying on a physical SO-101 arm, ETRI Field Robotics Laboratory.
media_layout: pinned-left
media:
  - /assets/video/etri-sim.mp4
  - /assets/video/etri-real.mp4
  - /assets/video/etri-teleop.mp4
---
I looked at whether a vision-language-action policy trained only on simulated demonstrations can run on real hardware. I collected demonstrations in Isaac Sim through leader-follower teleoperation, then worked hands-on with vision-language-action models — training and running inference myself to deploy a fine-tuned π0 policy on a physical SO-101 arm picking up a marker and dropping it into a cup.

Success in simulation climbed to 80% as I added demonstrations and tuned how far ahead the policy predicts, but the same policy reached only about 30% on the real robot. Mixing real-world demonstrations into training did not close that gap, which pointed at the coverage of the data and the absence of recovery behaviour rather than sheer volume.

I also trained GR00T N1.5 under the same conditions to see how its separated vision-language and action modules compare with π0's single unified model.

Beyond this, I experimented with starVLA and MimicGen for robot action data augmentation, and explored reinforcement-learning-based fine-tuning as an alternative approach.
