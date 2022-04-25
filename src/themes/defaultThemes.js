import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        defaultColor: {
            400: '#f0f0f0',
            500: '#222224',
            600: '#ee1515'
        },
        bgPokedex: {
            normal:     "#BABAAE",
            fighting:   "#A75543",
            flying:     "#78A2FF",
            poison:     "#A95CA0",              
            ground:     "#EECC55",
            rock:       "#CCBD72",
            bug:        "#C2D21E",
            ghost:      "#7975D7",
            steel:      "#C4C2DB",
            fire:       "#FA5643",
            water:      "#56ADFF",
            grass:      "#8CD750",
            electric:   "#FDE139",
            psychic:    "#FA65B4",
            ice:        "#96F1FF",
            dragon:     "#8673FF",
            dark:       "#8D6855",
            fairy:      "#F9AEFF"
        },
        trackColor: {
            hp:         "#8CD750",
            attack:     "#FA5643",
            "special-attack":     "#FA65B4",
            defense:    "#56ADFF",
            "special-defense":    "#BABAAE",
            speed:      "#8D6855",
        }
    },
    breakingPoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
    },
    sizes: {
        max: 'max-content',
        min: 'min-content',
        full: '100%', 
        mid: '50%',
    },
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'Georgia, serif',
        mono: 'Menlo, monospace'
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem'
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
    },
    lineHeights: {
        normal: 'normal',
        none: 1,
        shorter: 1.25,
        short: 1.375,
        base: 1.5,
        tall: 1.625,
        taller: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem'
    },
    letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em'
    }
})
export default theme
