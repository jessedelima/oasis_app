import 'styled-components/native'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
			main: string,
			secondary: string,
			tertiary: string,
    };
  }
}
