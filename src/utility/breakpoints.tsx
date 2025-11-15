export const size = {
    xs: 320,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1440,
    wide: 1920,
    ultra: 2560
};

export const device = {
    xs: `(min-width: ${size.xs}px)`,
    sm: `(min-width: ${size.sm}px)`,
    md: `(min-width: ${size.md}px)`,
    lg: `(min-width: ${size.lg}px)`,
    xl: `(min-width: ${size.xl}px)`,
    xxl: `(min-width: ${size.xxl}px)`,
    wide: `(min-width: ${size.wide}px)`,
    ultra: `(min-width: ${size.ultra}px)`
};

export const maxDevice = {
    xs: `(max-width: ${size.sm - 1}px)`,
    sm: `(max-width: ${size.md - 1}px)`,
    md: `(max-width: ${size.lg - 1}px)`,
    lg: `(max-width: ${size.xl - 1}px)`,
    xl: `(max-width: ${size.xxl - 1}px)`,
    xxl: `(max-width: ${size.wide - 1}px)`,
    wide: `(max-width: ${size.ultra - 1}px)`
};

export const between = {
    smToMd: `(min-width: ${size.sm}px) and (max-width: ${size.md - 1}px)`,
    mdToLg: `(min-width: ${size.md}px) and (max-width: ${size.lg - 1}px)`,
    lgToXl: `(min-width: ${size.lg}px) and (max-width: ${size.xl - 1}px)`,
    xlToXxl: `(min-width: ${size.xl}px) and (max-width: ${size.xxl - 1}px)`
};

export const orientation = {
    portrait: '(orientation: portrait)',
    landscape: '(orientation: landscape)'
};

// Комбинированные запросы
export const combined = {
    mobilePortrait: `${device.xs} and ${orientation.portrait}`,
    mobileLandscape: `${between.smToMd} and ${orientation.landscape}`,
    tabletPortrait: `${device.md} and ${maxDevice.lg} and ${orientation.portrait}`,
    tabletLandscape: `${device.md} and ${maxDevice.lg} and ${orientation.landscape}`
};
