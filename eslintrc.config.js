import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        extends: ["next","next/core-web-vitals"],
        plugins: {
            'react-refresh': reactRefresh,
        },
        rules: {
            'react-refresh/only-export-components': 'warn',
            "react/no-unescaped-entities": 0,
            "react-hooks/exhaustive-deps": 1
        },
    },
];


