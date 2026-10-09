# Veist Rewards

## Overview

A small loyalty programme app built with Expo (SDK 57) and Expo Router, themed after Destiny's Veist foundry. Users see their points balance and tier, browse the offers available to them (and the ones they could unlock at higher tiers), open an offer to see its details, and redeem it to get a QR code to show when ordering.

- **Home:** greeting, points card with progress towards the next tier, and offers grouped into "Your offers" and "Unlock at <tier>".
- **Offer details** (`/offer/[id]`): description and a Redeem button, which generates a one-off code shown as a QR code plus text. If the user's tier is too low, the screen shows how many more lifetime points they need instead.
- Works on iOS, Android and web. Light and dark mode are both supported.

## Getting started

```bash
npm install
npx expo start
```

Then press `w` to open it on the web, or scan the QR code with Expo Go. No development build is needed, since every dependency is included in Expo Go.

Other commands:

```bash
npm run test:ci    # run the unit tests once
npm test           # run the tests in watch mode
npx expo lint      # lint
npx tsc --noEmit   # typecheck
```

**Tests:** unit tests cover the business logic in `src/logic/user-tier.ts`: tier lookup, tier progress, eligibility, and offer grouping. The logic is all pure functions, so it can be tested without rendering anything.

I tested the UI by hand on web, including:

- Deep linking straight to an offer on a cold start: `http://localhost:8081/offer/2` on the web, or `laughingchainsaw://offer/2` on a device.
- Loading, error, retry and "offer not found" states (see "Testing loading and error states" below).

## Key decisions

### Structure

- **Routing:** Expo Router. The root layout is a Stack containing the tab navigator `(tabs)` and the offer details route `offer/[id]`. That lets the offer screen push over the tabs and gives it a URL, so it can be deep-linked. `unstable_settings.anchor` makes sure a deep-linked offer still has the home screen underneath it, so the back button works on a cold start.
- **Folders:** `src/app` contains routes only. `src/api` has the (mock) fetchers, `src/hooks` the data hooks, `src/logic` the pure business logic (tiers, eligibility, progress, code generation), and `src/components` the UI.
- **Business logic is separate from presentation.** Functions like `groupOffersByTier` and `getTierProgress` return data (for example `{ tier, locked, data }` or a 0–1 progress value), and the components decide on wording and layout. That keeps the rules easy to test and the copy easy to change.

### Eligibility

Eligibility rules live in one place (`isEligible` in `src/logic/user-tier.ts`). Both the home list and the offer screen use it. Locked offers on the home screen aren't tappable, but the offer screen checks eligibility again because it can be reached through a deep link. In production the server would enforce this. The client-side check is only there for a better user experience.

### Theming

Colors are defined as tokens in `src/constants/theme.ts`, separately for light and dark mode, and checked for contrast. The lime accent is unreadable on white, so it has separate roles: `accent` for fills, `onAccent` for text on those fills, and `accentText` for accent-colored text. The React Navigation theme is built from the same tokens, so headers, backgrounds and transitions match.

### QR Code

QR Code instead of barcode: I couldn't find one that was both recently maintained and did not need a development build so I instead went with a QR Code generator. In an actual build I would look to find a solution that worked better to actually meet the brief. Either by using different libraries for native/web, or bringing a library in-house and adapting it to work for our use-case, or discussion with stakeholders about whether the brief could be changed. However with this small-scale project I went with the easier option of using QR codes instead of a barcode.

### Loyalty program shape

Shape of loyalty program: Could have done something like earn points, spend points thing... Decided to go with tiers where you're only eligible for certain offers if you're in a specific tier with lifetime points being how you move up the tiers. This allowed for some selection stuff, but all done with a single list. The theory then is that each offer costs you some of your balance or active points when you redeem them.

### Tab Navigation

I didn't really use the tabs navigation, but felt like leaving them in was a smart idea. Many apps would go from this current basic view to adding something like a 'my profile' or 'settings' page, so instead of re-building it from scratch I left it with its very basic functionality.

## Trade-offs and next steps

What I simplified or left out:

- **Mock API.** The data is hard-coded in `src/api`. There's no backend, authentication, or persistence.
- **Redemption is client-side.** Codes are generated with `Math.random`, which isn't secure but is fine for a mock. Redeeming doesn't deduct points, and the code disappears when you leave the screen.
- **QR code instead of a barcode.** See above.
- **Tests cover the logic layer only.** There are no component or end-to-end tests yet.
- **Locked offers can't be opened**, so users can't see the details of offers they haven't unlocked.
- **Single-tab navigation.** It's kept so more screens can be added without restructuring.
- The error state's Retry button is React Native's built-in `Button`, so it uses the platform style rather than the custom lime button.

With more time:

- **More tests:** component tests (React Native Testing Library) for the loading, error, locked and redeemed states, plus unit tests for `redemption-code.ts` (length and character set).
- **A real API**, with server-side eligibility checks, code generation, single-use codes and point deduction. I'd add a per-offer endpoint and seed it from the list cache.
- **Persist active redemptions**, so a code survives leaving the screen and shows an expiry time.
- **Barcode support**, using a development build and a native barcode library, with a web fallback.
- **Show locked offers' details** with an inline "X points to unlock" nudge.
- Present the offer screen as a native bottom sheet (`presentation: "formSheet"`) on iOS and Android.
- Keep showing cached data when a background refresh fails, rather than replacing the screen with an error.

## AI tools

I used AI for bootstrapping and syntax primarily. Secondarily using it as a reviewer and bug finder. Also used it to explain some concepts I don't have deep knowledge of such as the specificities of Expo Router.

## Anything else

### Testing loading and error states

The mock API is set up so you can see these states without changing any code:

- **Loading:** the user request has a 1-second delay, so every cold load shows the spinner.
- **Error:** every second offers request fails. Opening an offer triggers a refetch, so roughly every other offer you open shows the error state, and Retry recovers it. The counter resets when you reload the app.
- On the web, switching browser tabs also triggers a refetch, which can shift the pattern by one.
- To see the loading state for the offers section (under the header), move the delay from `src/api/user.ts` to `src/api/offers.ts`.

### Other notes

- I developed this on Windows, only testing on the web.
- The Veist theme is a fan theme based on Bungie's Destiny. It isn't intended for publishing.
