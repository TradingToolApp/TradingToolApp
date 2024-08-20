const routes = [
    {
        eventKey: 'dashboard',
        icon: "DashboardIcon",
        title: "Dashboard",
        href: "/dashboard",
        children: [
            {
                title: "Posts",
                href: "/dashboard/posts"
            },
            {
                title: "Categories",
                href: "/dashboard/categories"
            },
            {
                title: "Authors",
                href: "/dashboard/authors"
            },
            {
                title: "Tags",
                href: "/dashboard/tags"
            }
        ]
    }
]