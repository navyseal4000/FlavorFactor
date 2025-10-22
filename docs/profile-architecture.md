# Profile feature architecture

The profile stack mirrors the log feature by centralising layout, navigation,
and data mocks inside `src/features/profile`.

## Layout & navigation

- `components/ProfileLayout.tsx` provides the shared safe-area aware shell with
a consistent header and the global bottom navigation. The layout optionally
accepts tab descriptors and pairs with `ProfileTabs` and
`ProfileTabsCarousel` to animate between sub-views using the same timing as the
log carousel.
- Each Expo Router route under `/settings` now renders a dedicated screen in
`src/features/profile/screens`. Screens use `ProfileLayout` directly or, for
single-view pages, the `ProfileSectionsScreen` helper.
- Tabs are declared via the `ProfileTabDescriptor` type and use the same
ordering for both the visual strip and animated scenes to keep navigation state
predictable.

## Data strategy

- Mock data that backs each page lives in `src/features/profile/mockData.ts` and
is shaped by the shared `ProfileSection` and `ProfileListItem` types. Keeping
mock content in a single module mirrors the log feature and makes it trivial to
swap in real API responses later.
- Sections describe the list layout (title, description, items) while items
capture display concerns such as icons, toggles, navigation metadata, and status
pills. Screens reference these mocks to stay deterministic in tests.

## Testing

- `tests/profileScreens.test.ts` renders representative screens with
`react-test-renderer` and verifies key content and interactions (including the
animated tab carousel) without requiring a runtime router. Screens expose an
optional `showBottomNav` prop to disable the navigation bar during tests,
allowing us to reuse the components in isolation.
