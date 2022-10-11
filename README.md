<p dir="auto" align="center">
  <img src='https://searchpal.s3.us-east-2.amazonaws.com/logo.gif' alt='Search Search' style='max-width: 100%; margin-bottom: -10%' width='160' height='160' />
</p>
<div dir="auto" align="center">
  <h1 dir="auto" align="center"> <a target='_blank' href='https://searchpal.elijahharry.com/'>searchpal</a> <sub><sup>(search pal<s>ette</s>)</sup></sub></h1>
</div>
<div dir="auto" align="center">
  <strong>Search Pallete Component for React :mag: Inspired by Spotlight Search</strong>
  <br />
  Simple, good lookin' & customizable. Autocomplete, search previews & more. Set search function to find exact and/or fuzzy matches.
  <br />
  <!-- <sub>Made with :hearts: by Elijah</sub> -->
</div>
<br />
<div dir='auto' align='center'>
<table>
<tr>
<td><a style='font-weight: 500' href='#getting-started'>Installation</a></td>
<td><a style='font-weight: 500' href='#basic-usage'>Usage</a></td>
<td><a style='font-weight: 500' href='#components'>Components</a></td>
<td><a style='font-weight: 500' href='https://searchpal.elijahharry.com/'>Demo</a></td>
</tr>
</table>
<!-- <a style='font-weight: 500' href='#search'>Screenshots</a> | <a style='font-weight: 500' href='#option'>Installation</a> | ><a style='font-weight: 500' href='#basic-usage'>Usage</a> -->
</div>

<!-- <div dir='auto' align="center"> -->

<div dir="auto" align="center">

<br />

<h4>

**Version 2.1 Released** :boom:

</h4>

<sup>

Now supports custom async search functions. [See the full release note](https://github.com/elijahharry/searchpal/releases/tag/diy-search).

</sup>

</div>

<br />

<!-- </div> -->

## Screenshots <sub><sup>or see a [live demo](https://searchpal.elijahharry.com/) :point_left:</sup><sub>

![](https://searchpal.s3.us-east-2.amazonaws.com/preview-bordered.png)

<div dir="auto" align="center">
  <strong>Light :sunny: and Dark :waxing_crescent_moon:</strong>
  <br />
  <sub>Pass in your own light & dark shades :art:</sub>
  <br />
  <br />
</div>

![](https://searchpal.s3.us-east-2.amazonaws.com/lightndark.gif)

<!-- | Search results                                        | Previews                                              | -->

<!-- | ----------------------------------------------------- | ----------------------------------------------------- | -->

<!-- | ![](https://searchpal.s3.us-east-2.amazonaws.com/8641df1a2fb7ab45fa1602de06fa0cd6c874400f.gif) | ![](https://searchpal.s3.us-east-2.amazonaws.com/45ac6561c71585ebf304e2c6f807c73944f3d845.gif) |
| ----------------------------------------------------- | ----------------------------------------------------- | -->

## Getting Started

### Installation

Get started by installing the npm package:

```
npm i searchpal
```

Then you can import the components & types within your React application:

```tsx
import { Search, Option, Detail } from "searchpal";
```

### Peer Dependencies

Alongside `react` and `react-dom`, the only other peer dependency is `styled-components`. If you currently have any of those packages installed, the minimum versions compatible with `searchpal` are:

| Package           | Min Version |
| ----------------- | ----------- |
| react             | 16.8        |
| react-dom         | 16.8        |
| styled-components | 4.0         |

## Basic Usage

Simply import the Search & Option components. Add a few required props to the Search: `open` and `onClose`. Map out your options as children, each option only requiring a `label`. Provide each option with some `keywords` utilizing a built-in [keyword filterer & interpreter](#keyword-interpreter):

```tsx
import { Search, Option, Detail } from "searchpal";

const UsersSearch = ({ users, session }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Search for a user</button>
      <Search
        label="Search for a user..."
        open={open}
        onClose={() => setOpen(false)}
        link={({ href, children }) => <a href={href}>{children}</a>}
      >
        {users.map((user) => (
          <Option
            label={user.name}
            sublabel={user.email}
            img={{ src: user.avatar, alt: `${user.name} profile picture` }}
            href={`/users/${user.id}`}
            keywords={(getKeywords) =>
              getKeywords(
                user.email,
                user.social && user.social.handle,
                user.organizations.map((org) => [
                  org.name,
                  org.locations.map((location) => [
                    location.city,
                    location.state,
                  ]),
                ])
              )
            }
            key={user.id}
          >
            <Detail label="Joined" value={user.joined} />
            {user.organizations.length && (
              <Detail
                label="Organizations"
                value={<Organizations items={user.organizations} />}
              />
            )}
          </Option>
        ))}
      </Search>
    </>
  );
};
```

## Custom Search

```tsx
<Search>
  {async (query) => {
    const options = await /* Your custom searcher here! */
    return options.map((option) => <Option {..option} />)
  }}
</Search>
```

Want or need to handle your own searches elsewhere? `searchpal` now supports your own custom, async search functions. [Learn more](#custom-search-function).

---

# Components

Comes with three seperate components which can be used in combination to build out your search palette.

| [Search](#search) | [Option](#option) | [Detail](#detail) |
| ----------------- | ----------------- | ----------------- |

<!-- | [Search](#search)   |   [Option](#option) | -->

## Search

Import the `Search` component:

```js
import { Search } from "searchpal";
```

### Search Props

The `Search` component has tons of props, all offering unique customizations. The only **required props are `open` and `onClose`**. Read all about the props below (sorted by category).

<!-- ## General -->

| Prop                | Accepts                                                                                                                                                                                                                  | Default                               | Description                                                                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`open`**\*        | `boolean`                                                                                                                                                                                                                |                                       | Open/close state of the search modal. Pass through `true` to open, `false` to close.                                                                                                                                                                                |
| **`onClose`**\*     | `() => void`                                                                                                                                                                                                             |                                       | Function that flips the `open` prop to `false` when a user closes the search modal.                                                                                                                                                                                 |
| `label`             | `string`                                                                                                                                                                                                                 | `"Search for anything..."`            | Label which displays as the search input's placeholder. Also utilized as an input label (only visible to screen readers).                                                                                                                                           |
| `algo`              | `'fuzz'`, `'exact'` or `'combo'`<br /><sub>[What are these?](#search-algorithms)</sub>                                                                                                                                   | `'combo'`                             | Select the search algorithm used to narrow results. [Learn more about these algorithms.](#search-algorithms)                                                                                                                                                        |
| `dark`              | `true`, `false` or `'user'`<br /><sub>See [example](#no-dynamic-light--dark--static-theme)</sub>                                                                                                                         | `'user'`                              | Enforce a specific light / dark mode, or base it on user preference.                                                                                                                                                                                                |
| `theme`             | [Theme Object](#theme-object)<br /> <sub><sup>Or an **[inline function](#inline-function-subsup-must-return-a-theme-objecttheme-object-supsub)** you can use to access an initilized [Theme Object](#theme).</sup></sub> | [View default theme](#default-theme)  | Configure/customize all colors utilized throughout the search palette. Accepts a single, initialized [Theme Object](#theme-object) or an [inline function](#inline-function-subsup-must-return-a-theme-objecttheme-object-supsub) you can use to access/return one. |
| `labels`            | [Labels](#labels)                                                                                                                                                                                                        | [View default labels](#labels-object) | All other labels utilized throughout the component can be configured here. With the expecting of the `noResults` property, all of these are only visible to screen readers.                                                                                         |
| `startExpanded`     | `boolean`                                                                                                                                                                                                                | `false`                               | Do you want options to be shown when the search query is empty?                                                                                                                                                                                                     |
| `animate`           | `grow`, `fade` or `slide`                                                                                                                                                                                                | `slide`                               | Select the animation utilized when the Search appears/disappears.                                                                                                                                                                                                   |
| `previewBreakpoint` | `number`                                                                                                                                                                                                                 | `570` <sub>(570px)</sub>              | Option previews would take up too much space on mobile devices, so by default they are hidden below 570px. If you'd like to change the breakpoint for this, you can via this prop.                                                                                  |
| `link`              | [Link](#link)</sub>                                                                                                                                                                                                      |                                       | Custom component used to add anchors/routing to options and options. <br /><sub>**Note**: This will only be utilized if the option is provided an `href`.</sub>                                                                                                     |

### Custom Search Function

Passing through your own custom searcher can be done so easily, and is 100% recommended over the included search algorithms when your users need to search through tons of data.

Simply add an asyncronhous function which returns a `ReactNode` as the child of the `Search` component. Map through the search results and include them as [Option](#option) components within the `ReactNode` (or don't, if there are no results). Use your function's first arguement to access the user's query.

**Your function will only run when the query changes.** It will saved in a `ref` that will exclusively have its most recently-saved version called upon when necessary. You can change the function and `searchpal` will update the `ref`, but these changes won't be reflected until the user updates their query.

#### Inline Custom Search Function

```tsx
import { Search, Option, Detail } from "searchpal";
import Avatar from "../Avatar";

const CustomSearch = ({ open, onClose }) => {
  return (
    <Search open={open} onClose={onClose}>
      {async (query) => {
        try {
          const res = await fetch(`YOUR_API/search?`, { method: "GET" });
          // Example with a singular option type...
          const { results } = res.json();
          return results.map(({ label, avatar, ...rest }, i) => (
            <Option
              label={label}
              media={<Avatar src={avatar} key={i.toString()} />}
              {...rest}
            />
          ));
          // Example with multiple option types...
          const { users, companies } = res.json();
          return (
            <>
              {users.map((user) => (
                <Option label={user.name} sublabel={user.email} key={user.id}>
                  <Detail label="Joined" value={user.joined} />
                </Option>
              ))}
              {companies.map((company) => (
                <Option
                  label={company.name}
                  sublabel={company.tagline}
                  img={{ src: company.logo }}
                >
                  {company.locations.map((location, i) => (
                    <Detail
                      label={`Location #${i + 1}`}
                      value={`${location.city}, ${location.state}`}
                    />
                  ))}
                </Option>
              ))}
            </>
          );
        } catch (e) {
          console.error(e);
          // Returning nothing will show no reuslts for that query (as would returning null, false, void or JSX without a single <Option />)
        }
      }}
    </Search>
  );
};
```

#### External Custom Search Function

```tsx
import { Search, Option } from "searchpal";

const searchUsers = async (query: string) => {
  const res = await fetch("...");
  const { options } = await res.json();
  return options.map((props) => <Option {...props} />);
};

const CustomSearch = ({ open, onClose }) => {
  return (
    <Search open={open} onClose={onClose}>
      {searchUsers}
    </Search>
  );
};
```

### Search Algorithms

Search comes with two seperate search algorithms (and one combination of the two). You can decide whichever one best suits your use case. See how the seperate algorithms work:

| Algorithm | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                                                                                                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `exact`   | ![](https://searchpal.s3.us-east-2.amazonaws.com/exact.gif)                                                                                                                              | Exclusively searches for **exact** occurances of shared words between the query/keywords and ranks based on number of occurances.                                                                                                                                                                                                                          |
| `fuzz`    | ![](https://searchpal.s3.us-east-2.amazonaws.com/fuzz.gif)                                                                                                                               | 'Fuzzy' search chunks will split each keyword into seperate, smaller chunks and individually compare them to the query, then compares scores between the options (only showing options within a score within close enough range of the option with the highest score). Essentially, users don't need to type everything perfectly to see relevant results. |
| `combo`   | ![](https://searchpal.s3.us-east-2.amazonaws.com/combo.gif)                                                                                                                              | Combo initially performs an `exact` search, and in the event there are no matches, runs a `fuzz` search. Solid mix of both algos, which is why this is the **default search algorithm**.                                                                                                                                                                   |

### Theme

Customize the theme (colors, borders, shadows, etc) of the search palette via the [Theme Object](#theme-object).

![](https://searchpal.s3.us-east-2.amazonaws.com/releases/2/theme-2.gif)

#### Theme Examples

##### Inline Function <sub><sup> Must Return a [Theme Object](#theme-object)! </sup></sub>

<sub>An inline function in the `theme` prop will provided you with access to an initialized [Theme Object](#theme-object).

```tsx
<Search
  theme={(theme) => {
    theme.accent("lightblue", "darkblue");
    theme.border(null, 2);
    theme.light.backdrop("rgb(240,240,240)", 0.8);
    theme.dark.backdrop("navy", "60%");
    return theme;
  }}
/>
```

##### Imported [Theme Object](#theme-object)

<sub>Import the [Theme Object](#theme-object) to initialize/configure it whereever you'd like. You can pass your theme through the contructor, or configure it via the [built-in methods](#theme-methods).</sub>

```tsx
import { Search, Theme } from "searchpal"

const theme = new Theme({ shadow: '0 5px 20px rgba(0, 0, 0, .5)', light: { accent: 'orange' }, dark: {accent: 'red'} })

theme.text('rgb(80, 80, 80)', 'rgb(155, 155, 155)')

theme.light.option.selected('orange', '#fff')
theme.dark.option.selected('red', '#fff')

<Search theme={theme} />
```

#### Theme Object

The Theme object stores your settings internally and provides you with methods which you can utilize to adjust the light & versions of your theme (or both at once).

##### Theme Methods

**All** of the following methods can be called specifically on the light & dark versions of your theme, or globally to adjust both versions simultaneously.

###### Call Globally &nbsp; <sub><sup>Writes to both light & dark versions!</sup><sub>

```tsx
theme.method("#000");
```

###### Call on Light / Dark Version

```tsx
theme.method.light('#fff')
theme.method.dark('#000)
```

The methods can be viewed below, alongside an example of their usage & a brief description of their purpose:

<table>
<tr>
<th>
Method
</th>
<th>
Usage & Purpose
</td>
</tr>

<tr>
<th>
accent
</th>
<td>

```tsx
theme.accent(Color, TextColor);
```

`Color` is the primary accent color utilized throughout the search modal.

`TextColor` is for adjusting the color of text overlaid ontop of the accent (i.e. in [Buttons](#button)).

**Using `theme.accent()`**:

```tsx
// Global
theme.accent("lightblue", "darkblue");
// Light & Dark
theme.light.accent("#00165a", "#fff");
theme.dark.accent("red", "white");
```

</td>
</tr>

<tr>
<th>
bg
</th>
<td>

```tsx
theme.bg(BackgroundColor);
```

`BackgroundColor` is the background color of the entire search palette.

**Using `theme.bg()`**:

```tsx
// Global
theme.bg("#d3d3d3");
// Light & Dark
theme.light.bg("white");
theme.dark.bg("#000080");
```

</td>
</tr>

<tr>
<th>
text
</th>
<td>

```tsx
theme.text(PrimaryColor, SecondaryColor);
```

`PrimaryColor` is the primary text color, `SecondaryColor` is the 'secondary' (faded/light) text color.

**Using `theme.text()`**:

```tsx
// Global
theme.text("rgb(60,60,60)", "rgb(200,200,200)");
// Light & Dark
theme.light.text("black", "grey");
theme.dark.text("white", "#d3d3d3");
```

</td>
</tr>

<tr>
<th>
border
</th>
<td>

```tsx
theme.border(BorderColor, BorderWidth);
```

Border styles used on every bordered element you see within the search palette. `BorderColor` being the color & `BorderWidth` being the width.

**Using `theme.border()`**:

```tsx
// Global
theme.border("#000", 2); // 2px
// Light & Dark
theme.light.border("grey", ".2rem");
theme.dark.border("transparent", 0);
```

</td>
</tr>

<tr>
<th>
shadow
</th>
<td>

```tsx
theme.shadow(BoxShadow);
```

Border styles used on every bordered element you see within the search palette. `BorderColor` being the color & `BorderWidth` being the width.

**Using `theme.shadow()`**:

```tsx
// Global
theme.shadow("0px 10px 10px rgb(150,150,150,.4)");
// Light & Dark
theme.light.shadow("0px 10px 10px 5px rgb(200,200,200,.5)");
theme.dark.shadow("0px 10px 10px 5px rgb(0,0,0,.6)");
```

</td>
</tr>

<tr>
<th>
backdrop
</th>
<td>

```tsx
theme.backdrop(BackgroundColor, Opacity);
```

Adjusts the color/opacity of the backdrop _behind_ the modal, used to give it some contrast when it's floating above the rest of your app. `BackgroundColor` is the backdrop's color, and `Opacity` is it's opacity level (i.e. `.65`) when it is fully-opened.

**Using `theme.backdrop()`**:

```tsx
// Global
theme.backdrop("black", "30%");
// Light & Dark
theme.light.backdrop("#d3d3d3", ".6");
theme.dark.backdrop("#00165a", "55%");
```

</td>
</tr>

<tr>
<th>
option
</th>
<td>

The `theme.option` method can be used to edit the background/text colors of an [Option](#option) in the results list. You can use `theme.option` to edit both the **selected/highlighted** & **deselected** versions of the [Option](#option) element.

<ul>

<li>

**Default Options:**

```tsx
theme.option(BackgroundColor, TextColor);
```

**Using `theme.option()`**:

```tsx
// Global
theme.option("#d3d3d3", "darkblue");
// Light & Dark
theme.light.option("white", "#000");
theme.dark.option("transparent", "#fff");
```

</li>
<li>

**Selected / Highlighted Options:**

```tsx
theme.option.selected(BackgroundColor, TextColor);
```

**Using `theme.option.selected()`**:

```tsx
// Global
theme.option.selected("blue", "lightblue");
// Light & Dark
theme.light.option.selected("#000", "#fff");
theme.dark.option.selected("#fff", "#000");
```

</li>
</ul>

</td>
</tr>

<tr>
<th>
backdrop
</th>
<td>

```tsx
theme.backdrop(BackgroundColor, Opacity);
```

Adjusts the color/opacity of the backdrop _behind_ the modal, used to give it some contrast when it's floating above the rest of your app. `BackgroundColor` is the backdrop's color, and `Opacity` is it's opacity level (i.e. `.65`) when it is fully-opened.

**Using `theme.backdrop()`**:

```tsx
// Global
theme.backdrop("black", "30%");
// Light & Dark
theme.light.backdrop("#d3d3d3", ".6");
theme.dark.backdrop("#00165a", "55%");
```

</td>
</tr>

<tr>
<th>
set
</th>
<td>

If you want to just pass through an non-nested object filled with your theme settings, you can do so with the `theme.set` method. This method accepts a [ThemeProperties](#) object.

**Using `theme.set()`**:

```tsx
// Global
theme.set({ text: "#d3d3d3", backdrop: "#000" });
// Light & Dark
theme.light.set({ accent: "red", borderColor: "rgb(240,240,240)" });
theme.dark.set({ accent: "lightblue", accentText: "darkblue" });
```

</td>
</tr>

</table>

#### Default Theme

By default, the palette is chosen from the dark/light versions below depending on the user's dark mode preferences. [See how to force a singular palette/mode](#no-dynamic-light--dark--static-theme).

```ts
{
  accent: "#3b82f6",
  accentText: "#fff",
  borderWidth: "1px",
  light: {
    background: "#fff",
    text: "#27272a",
    textSecondary: "#929294",
    borderColor: "#f2f3f6",
    shadow: "0 25px 50px -12px rgba(156,163,175,.2)",
    backdrop: "#e5e7eb",
    backdropOpacity: ".65",
    optionBackground: "transparent",
    optionText: "#27272a",
    optionSelectedBackground: "#f4f4f5",
    optionSelectedText: "#27272a",
  },
  dark: {
    background: "#1f2937",
    text: "#fff",
    textSecondary: "#8e939a",
    borderColor: "#393939",
    shadow: "0 25px 50px -12px rgba(31,41,55,.8)",
    backdrop: "#111827",
    backdropOpacity: ".65",
    optionBackground: "transparent",
    optionText: "#fff",
    optionSelectedBackground: "#4b5563",
    optionSelectedText: "#fff",
  },
}
```

##### No Dynamic Light & Dark / Static Theme

If you'd like to force light / dark mode, you can either pass a boolean (`true` or `false`) through the Search's `dark` prop, or pass through a [Theme Object](#theme-object) with **all colors globally overwritten** (otherwise, the missing properties will be pulled from the [default theme](#default-theme) above corresponding with the user's light/dark mode).

<sub>Force **dark** mode:</sub>

```tsx
<Search dark />
```

<sub>Force **light** mode:</sub>

```tsx
<Search dark={false} />
```

### Labels

Customize aria-labels only visible to screen readers and other text content within the Search.

#### Label Object

| Key         | Accepts                               | Description                                                                                                                                                   |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`     | `string`                              | Utilized by the main Search modal as an `aria-labeledby`, otherwise not visible.                                                                              |
| `subtitle`  | `string`                              | Utilized by the main Search modal as an `aria-describedby`, otherwise not visible.                                                                            |
| `results`   | `string`                              | Used to describe the search results `ul` element, otherwise not visible.                                                                                      |
| `noResults` | `{ title: string, subtitle: string }` | Message displayed to users when no search results can be found. Also utilized on the search `input` to describe it's `aria-invalid` status to screen readers. |

#### Default Labels

```ts
{
  title: 'Search prompt',
  subtitle: 'Use this dialog to perform a quick search.'
  results: 'Search results',
  noResults: {
    title: 'No results found for query.',
    subtitle: 'Try searching for something else.'
  }
}
```

#### Custom Labels Example

```tsx
<Search
  labels={{
    results: "Matching users",
    noResults: { title: "No users found." },
  }}
/>
```

### Link

Use if you'd like to wrap options/buttons with anchors (`<a>`) in the event that the `Option` was provided with an `href`. As an alternative, you could add an `onClick` to any `Option` and include your routing within it.

![](https://searchpal.s3.us-east-2.amazonaws.com/custom-link.gif)

#### Link Example

The `href` will always be a string (if there is no url, your `Link` component won't even be called). Make sure to render `children`!

```tsx
import Search, { LinkComponent } from "searchpal";
import Link from "next/link";

const Anchor: LinkComponent = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  );
};

const SearchLinked = () => {
  return <Search {...props} link={Anchor} />;
};
```

<!-- ##### [Details](#link-details)   |   [Example](#link-example)   |   [Types](#link-types) -->

<!--
| Link Demo                                                         |
| ----------------------------------------------------------------- |
| ![](https://searchpal.s3.us-east-2.amazonaws.com/custom-link.gif) | -->

<!-- <table>
<tr>
<th>
Link Example
</th>
</tr>
<tr>
<td>

```tsx
import Search, { LinkComponent } from "searchpal";
import Link from "next/link";

const Anchor: LinkComponent = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <a>{children}</a>
    </Link>
  );
};

const SearchLinked = () => {
  return <Search {...props} link={Anchor} />;
};
```

</td>

</tr>
</table> -->

#### Link Types

All available for use in your code:

```ts
type LinkProps = {
  href: string;
  children: ReactNode;
};

type LinkComponent = FunctionComponent<LinkProps>;
```

---

## Option

An `Option` is just a searchable object with extra props for it's display/action customizations. Import the `Option` component:

```js
import { Option } from "searchpal";
```

#### Option Props

An `Option`'s props have some caveats, along with a few features to make things easier for you. Each `Option` only requires a single prop: `label`.

| Key           | Accepts                                                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`label`\*** | `string`                                                                                              | Required `string` utilized as the primary label for an `Option` in search results and previews. Does not need to be unique.                                                                                                                                                                                                                                                                                                                                                                                   |
| `sublabel`    | [Renderable](#what-is-renderable)                                                                     | Utilized within the preview panel, typically beneath the `label`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `keywords`    | `string[]` or [Interpreter Function](#keyword-interpreter) <br /><sub>See [examples](#keywords)</sub> | Strings used alongside the `label` when searching options for search results. Accepts an array of strings, or a [function which will allow you to access an automatic keyword filterer/interpreter](#keyword-interpreter).<br /><sub>For more advanced cases in which you'd like to determine keywords via **conditional logic**, **nested-arrays**/**mappings**, **inline functions**, etc - the [auto-interpreter](#keyword-interpreter) should save you some time (and also make your code cleaner).</sub> |
| `img`         | `{ src: string; alt?: string }`                                                                       | Pass through an image associated with the option, as an object with a `src` and optional `alt`. By default, it's displayed in search results and preview panels. <br /><sub>**Note**: Without an `alt`, images become invisible to screen readers by default.</sub>                                                                                                                                                                                                                                           |
| `onClick`     | `(e: MouseEvent<HTMLButtonElement>) => void`                                                          | Pass through a function which will run when the `Option` receives one of the following events: <ul><li>`Option` is clicked in the results menu</li><li>Button inside `Option`'s preview panel is clicked</li><li>User presses `Enter` while the `Option` is highlighted in search results</li></ul>                                                                                                                                                                                                           |
| `href`        | `string`                                                                                              | Add a direct link to an option in search results and the button in its preview panel. The `href` prop is **only utilized** if you've provided the parent `Search` with a [custom Link](#link).<br /><sub>If you've provided an `href` and a [Link](#link), and the user has the `Option` highlighted in search results, they will also be redirected on `Enter`.</sub>                                                                                                                                        |
| `cta`         | [Renderable](#what-is-renderable)                                                                     | Label for button used in the option's preview panel. Default is `'Select'`.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `previewless` | `boolean`                                                                                             | Turn off the preview panel for an `Option`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `media`       | [Renderable](#what-is-renderable) or [MediaComponent](#media)                                         | Fills in the image/avatar frames on search results and in `Option` preview panels.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `arrow`       | [Renderable](#what-is-renderable) or [ArrowComponent](#arrow)                                         | Replaces the little arrow icon on each option in search results.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `preview`     | [Renderable](#what-is-renderable) or [PreviewComponent](#preview)                                     | Fully replaces the top section of the preview panel.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### Keywords

Each `Option` will automatically receive the `label` prop as a keyword, so no need to re-add it. If you'd like to include other keywords, you can utilize `keywords` in two seperate ways:

#### Array of Strings

Pass through a simple array of your keywords. Must be strings. Good enough for basic use cases.

```tsx
<Option
  keywords={[
    user.email,
    ...(user?.social ? [user.social.handle] : []),
    ...(user.organizations
      ? user.organizations.map((organization) => organization.name)
      : []),
  ]}
/>
```

#### Keyword Interpreter

The `keywords` prop can be used to access a filterer/interpreter. All you need to do is pass an inline-function through the `keywords` props, the interpreter will be available as its only param. Have the inline function return the interpreter with as many arguements as you'd like.

The interpreter **accepts anything** as a value and will turn it into an array of strings. Nested arrays & functions can all be utilized to generate your `keywords` array.

```tsx
<Option
  keywords={(interpret) =>
    interpret(
      user.email,
      // Falsey values auto-filtered
      user.social && user.social.handle,
      // Nested arrays are traversed & filtered
      user.organizations.length &&
        user.organizations.map((organization) => [
          organization.name,
          organization.locations.length &&
            organization.locations.map((location) => [
              location.city,
              location.state,
            ]),
        ]),
      // Functions executed & returns filtered
      () => {
        switch (user.permissions) {
          case "super":
            return "admin";
          case "raised":
            return "moderator";
          default:
            return "customer";
        }
      }
      // ... continue adding as many arguments/keywords as you want!
    )
  }
/>
```

<sup>**Note**: Only strings will end up in the final array of keywords. Any other received/interpreted values _will not_ end up in the final array of keywords.</sup>

<!-- ### Option Components

Custom components/elements you can pass to each `Option`.

| [Media](#media) | [Arrow](#arrow) | [Preview](#preview) |
| --------------- | --------------- | ------------------- | -->

### Media

Pass through a custom component or element utilized to display an option's `img` (or anything you'd like).

| Custom Media                                                       | Default Media                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| ![](https://searchpal.s3.us-east-2.amazonaws.com/media-custom.png) | ![](https://searchpal.s3.us-east-2.amazonaws.com/media-def.png) |

#### Media Examples

The `media` prop accepts a simple [Renderable](#what-is-renderable) object or a custom component constructor.

<table>
<tr>
<th>
Renderable Object
</th>
</tr>
<tr>
<td>

```tsx
import { Option } from "searchpal";

users.map((user) => (
  <Option media={<Avatar img={user.image} name={user.name} />} />
));
```

</td>
</tr>
</table>

<table>
<tr>
<th>
Custom Media Component
</th>
</tr>
<tr>
<td>

```tsx
import { Option, MediaComponent } from "searchpal";

const Media: MediaComponent = ({ img, label }) => {
  return (
    <div className="avatar">
      {img ? (
        <img src={img.src} alt={img.alt} />
      ) : (
        <span>{label.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

users.map((user) => <Option media={Media} />);
```

</td>
</tr>
</table>

#### Media Types

The following types are available to you via import from `searchpal`:

```ts
type MediaProps = {
  img?: { src: string; alt?: string }; // Copied from the Option's 'img' prop
  label: string; // Copied from the Option's 'label' prop
  active: boolean; // Whether or not option is selected/highlighted in search results
  hovered: boolean; // Hover state of parent option
  focused: boolean; // Focus state of parent option
};

type MediaComponent = FunctionComponent<MediaProps>;
```

<sup>**Note**: The `active`, `hovered` and `focused` props will only ever return `true` if the `MediaComponent` is utilized **_within search results_**.</sup>

### Arrow

Replace the arrow which appears on each option in search results.

| Custom Arrow                                                       | Default Arrow                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| ![](https://searchpal.s3.us-east-2.amazonaws.com/arrow-custom.png) | ![](https://searchpal.s3.us-east-2.amazonaws.com/arrow-def.png) |

#### Arrow Examples

The `arrow` prop accepts a simple [Renderable](#what-is-renderable) object or a custom component constructor.

<table>
<tr>
<th>
Renderable Object
</th>
</tr>
<tr>
<td>

```tsx
import { Option } from "searchpal";

users.map((user) => (
  <Option
    arrow={
      <div className="checkbox">
        {selected.includes(user.id) && <Checkbox />}
      </div>
    }
  />
));
```

</td>
</tr>
</table>

<table>
<tr>
<th>
Custom Arrow Component
</th>
</tr>
<tr>
<td>

```tsx
import { Option, ArrowProps } from "searchpal";

const Arrow = ({ checked, focused }: ArrowProps & { checked: boolean }) => {
  return (
    <div
      className={[
        "checkbox",
        checked ? "checkbox-checked" : "checkbox-empty",
        focused ? "checkbox-focus" : "",
      ].join(" ")}
    >
      {checked && <Checkbox />}
    </div>
  );
};

users.map((user) => (
  <Option
    arrow={(props) => <Arrow checked={selected.includes(user.id)} {...props} />}
  />
));
```

</td>
</tr>
</table>

#### Arrow Types

All available to you via import from `searchpal`:

```ts
type ArrowProps = {
  active: boolean; // Whether or not option is selected/highlighted in search results
  hovered: boolean; // Hover state of parent option
  focused: boolean; // Focus state of parent option
};

type ArrowComponent = FunctionComponent<ArrowProps>;
```

### Preview

Customize the option preview which appears on the right-hand side of the `Search` when an option is selected (on desktop).

| Custom Preview                                                       | Default Preview                                                   |
| -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![](https://searchpal.s3.us-east-2.amazonaws.com/preview-custom.png) | ![](https://searchpal.s3.us-east-2.amazonaws.com/preview-def.png) |

#### Preview Examples

The `preview` prop accepts a simple [Renderable](#what-is-renderable) object or a custom component constructor.

<table>
<tr>
<th>
Renderable Object
</th>
</tr>
<tr>
<td>

```tsx
import { Option } from "searchpal";

users.map((user) => (
  <Option
    preview={
      <div className="preview">
        <img src={user.img} className="avatar" />
        <h2>{user.name}</h2>
      </div>
    }
  />
));
```

</td>
</tr>
</table>

<table>
<tr>
<th>
Custom Preview Component
</th>
</tr>
<tr>
<td>

```tsx
import { Option, PreviewComponent } from "searchpal";

const Preview: PreviewComponent = ({ img, media, label, sublabel }) => {
  return (
    <div className="preview">
      {(img || media) && (
        <div className="media">{media || (img && <img src={img.src} />)}</div>
      )}
      <div>
        <h2>{label}</h2>
        <span>{sublabel}</span>
      </div>
    </div>
  );
};

users.map((user) => <Option preview={Preview} />);
```

</td>
</tr>
</table>

#### Preview Types

The `PreviewComponent`'s `media` prop is reduced from the object/component you passed through the `Option`'s [media prop](#media) (i.e. if you passed through a [custom MediaComponent](#media), you will receive its return as a valid `ReactElement`). The following types are all available to you via import from `searchpal`:

```ts
type PreviewProps = {
  label: string; // Copied from the Option's 'label' prop
  sublabel?: Renderable; // Copied from Option's 'sublabel' prop
  img?: { src: string; alt?: string }; // Copied from the Option's 'img' prop
  media?: ReactElement; // Reduced from Option's 'media' prop
};

type PreviewComponent = FunctionComponent<PreviewProps>;
```

### Button

Customize the `button` displayed in an option's preview panel.

| Custom Button                                                       | Default Button <sub><sup>(with `cta`)</sup></sub>                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![](https://searchpal.s3.us-east-2.amazonaws.com/button-custom.png) | ![](https://searchpal.s3.us-east-2.amazonaws.com/button-def.png) |

If the `Option` has an `href` and you passed through a custom [Link](#link) component, then your custom button will automatically be wrapped by your [Link](#link) (essentially, in those circumtances, it is unnecessary to include an `href` on your custom button).

#### Button Examples

The `button` prop accepts a simple [Renderable](#what-is-renderable) object or a custom component constructor.

<table>
<tr>
<th>
Renderable Object
</th>
</tr>
<tr>
<td>

```tsx
import { Option } from "searchpal";

users.map((user) => (
  <Option
    button={
      <button className="button" onClick={() => message(user.id)}>
        Message {user.name}
      </button>
    }
  />
));
```

</td>
</tr>
</table>

<table>
<tr>
<th>
Custom Button Component
</th>
</tr>
<tr>
<td>

```tsx
import { Option, ButtonComponent } from "searchpal";

const Button: ButtonComponent = ({ cta, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {cta}
    </button>
  );
};

users.map((user) => (
  <Option
    label={user.name}
    cta={[`Message ${user.name.split(" ")[0]}`, <MessageSvg />]}
    onClick={() => message(user.id)}
    button={Button}
  />
));
```

</td>
</tr>
</table>

#### Button Types

```ts
export type ButtonProps = {
  label: string; // Option's label
  onClick?: ClickEventHandler<HTMLButtonElement>; // Taken from Option's 'onClick' prop
  cta: Renderable; // Taken from Option's 'cta' prop, default is "Select"
};
export type ButtonComponent = FunctionComponent<ButtonProps>;
```

---

## Detail

The `Detail` component can be used to add a row of info inside an `Option`'s preview panel.

![](https://searchpal.s3.us-east-2.amazonaws.com/details.png)

Import the `Detail` component:

```js
import { Detail } from "searchpal";
```

### Detail Usage

Simply import the `Detail` component an add it as a child to it's related `Option`.

```tsx
import { Option, Detail } from "searchpal";

users.map((user) => (
  <Option label={user.name} key={user.id}>
    <Detail label="Email" value={user.email} />
    {user.organizations && (
      <Detail
        label="Organizations"
        value={<Orgs orgs={user.organizations} />}
      />
    )}
    {user.locations &&
      user.locations.map((location, i) => (
        <Detail label={`Location #${i + 1}`} value={location.city} />
      ))}
  </Option>
));
```

The `Option`'s children are intelligently traversed, so if your use-case requires it you can add `Detail`s as subchildren. They will still be included:

```tsx
users.map((user) => (
  <Option label={user.name} key={user.id}>
    {user.profiles && (
      <>
        {user.profiles.twitter && (
          <Detail label="Twitter" value={user.profile.twitter} />
        )}
        {user.profiles.facebook && (
          <Detail label="Facebook" value={user.profile.facebook} />
        )}
        {user.profiles.github && (
          <Detail label="Github" value={user.profile.github} />
        )}
      </>
    )}
  </Option>
));
```

### Detail Props

Both `label` and `value` are required props.

| Prop          | Accepts                           | Description                                       |
| ------------- | --------------------------------- | ------------------------------------------------- |
| **`label`\*** | `string`                          | The label/descriptor of the detail (left column). |
| **`value`\*** | [Renderable](#what-is-renderable) | The value of the detail (right column).           |

If you pass `value` a [Renderable](#what-is-renderable) object which exclusively contains falsey objects, the `Detail` might not display (alongside an error). As an example:

```tsx
<Detail
  label="Sample"
  value={[user?.name && user.name.first, user.verified && <VerifiedIcon />]}
/>
```

In the event that both of those conditions return `false`, the `Detail` cannot be displayed. Internally `searchpal` runs a check on every [Renderable](#what-is-renderable) prop and filters out falsey values. If the prop exclusively contains falsey values, it will default to `undefined` (an error, considering `value` is required).

---

## What is `Renderable`?

Needed to come up with an abbreviation as the same type is utilized repeatedly throughout this lib. In general, `Renderable` signifies all _truthy_ types within `ReactNode`, or an array of them. Pretty much any object that can be successfully rendered is a `Renderable`. Acceptable types are:

- `string`
- `number`
- `ReactElement` <sub><sup>Chunk of JSX: `<div>Sample</div>`, `<>Sample</>`, `<Sample />`, etc</sup></sub>
- `false` <sub><sup>Gets auto-filtered, exclusively included to allow used of conditionals (`&&`) without type errors.</sup></sub>
- Or an `array` of the above types

<sub>**Note**: If the `Renderable` prop is required (i.e. the `Detail` `value`) and you pass through `false` or an array of `false` you will notice errors. We automatically filter falsey values from `Renderable` props, and in the event that we are leftover with no truthy objects, the required prop will then default to `undefined`.<sub>

##### Valid `Renderable` Examples :white_check_mark:

```tsx
users.map((user) => (
  <Option
    // String
    sublabel={user.email}
    // ReactElement or Fragment
    sublabel={
      <>
        {user.email}
        {user.emailVerified && <VerifiedIcon />}
      </>
    }
    // Array of Renderables
    sublabel={[user.email, user.emailVerified && <VerifiedIcon />]} // [ReactElement, ReactElement || false] in this sample
  />
));
```

## Development

Get started by cloning this repository:

```
git clone https://github.com/elijahharry/searchpal.git
```

Run `npm install` from within the primary directory:

```
cd searchpal
npm i
```

Within the primary directory, you can launch the sandbox/demo React app via:

```
npm run dev
```

Or create a fresh build of the `lib` via:

```
npm run build
```

Inside of the `demo` directory (sandbox), you can import directly from `lib` for testing purposes:<br />
<sub>Import directly from `lib` (non-build, hot-reload):</sub>

```tsx
import { Search } from "@searchpal/dev";
```

<sub>Import latest build of `lib`:</sub>

```tsx
import { Search } from "@searchpal/build";
```
