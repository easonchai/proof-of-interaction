# Proof of Interaction 📍

Hello! 👋

We are team POISON 🔥 - a team of 2 participating in the ETHKL 2023 Hackathon! 💪🇲🇾

## About

P.O.I.S.O.N 🔥 = Proof of Interaction So Obviously Needed _(duh)_

Read further to explore the whys, the hows and the use cases of our hackathon project and what we are trying to achieve in Exploring New Frontiers in Ethereum!

## Why Proof of Interaction?

Imagine a world where every off-chain interaction, no matter how unique or complex, can be seamlessly and verifiably recorded on the blockchain. Welcome to '**Proof of Interaction**,' an _open and extensible protocol_ that brings this vision to life.

We have Real World Assets (RWA), tokenisation, phygital goods etc but there is no way of tracking Real World Avents (RWE) or standardised ways of having, storing or tracking RWE.

This is important to achieve things like:

1. Smart contract automation based on physical interactions or events
2. Tracking of events & the verification of such data
3. More trustlessness
4. Better UX

Think of some applications like gaming, treasure hunts, recycling rewards, attendance rewards, so on and so forth!

## How is it done?

Taking inspiration from the simplicity & ingenuity of Sign In With Ethereum (SIWE), we allow users to interact with any arbitrary data and sign a message with that data encoded in it. That message is then stored on chain and validated with oracles to ensure the integrity and validity of such data

<img src="./assets/Data flow diagram.png" alt="Data flow" />

The data can then be verified using multiple oracles and cryptoeconomic incentives can be deployed to ensure high availability and correctness of such data.

### Real World Example

Let's assume that after attending an event, you will earn a reward/claim your stake back for the event. This can be done easily like the diagram below

<img src="./assets/Real world example.png" alt="Real world example" />

### User Experience

Now obviously you'd assume your users go through an easy user journey, but the reality is often disappointing

<img src="./assets/Bad UX.png" alt="Bad UX" />

That's where **Account Abstraction** comes into play!

<img src="./assets/Good UX.png" alt="Good UX" />

## Repositories 🏗

There is plenty more to talk about, but the best way is to just explore the repository!

- [Backend](./backend/)
- [Frontend](./frontend/)
- [Smart Contracts](./smart-contracts/)

Made with ❤️ by Team POISON 🔥
