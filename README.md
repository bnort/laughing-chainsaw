# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Key decisions

QR Code instead of barcode: I couldn't find one that was both recently maintained and did not need a development build so I instead went with a QR Code generator. In an actual build I would look to find a solution that worked better to actually meet the brief. Either by using different libraries for native/web, or bringing a library in-house and adapting it to work for our use-case, or discussion with stakeholders about whether the brief could be changed. However with this small-scale project I went with the easier option of using QR codes instead of a barcode.

Shape of loyalty program: Could have done some like earn points, spend points thing... Decided to go with tiers where you're only eligible for certain offers if you're in a specific tier with lifetime points being how you move up the tiers. This allowed for some selection stuff, but all done with a single list. The theory then is that each offer costs you some of your balance or active points when you redeem them.

I didn't really use the tabs navigation, but felt like leaving them in was a smart idea. Many apps would go from this current basic view to adding something like a 'my profile' or 'settings' page, so instead of re-building it from scratch I left it with its very basic functinoality.

## AI Use

I used AI for bootstrapping and syntax primarily.
