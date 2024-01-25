import "./styles/globals.scss";

export const metadata = {
    title: 'OpenAI - RainYak',
    description: '您的 OpenAi 贴心助手！',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?46f1be9091df694c3b9984fcd6661552";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
            `,
                }}
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <title></title>
        </head>
        <body>{children}</body>
        </html>
    )
}
