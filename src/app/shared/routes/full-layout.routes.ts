import {Routes, RouterModule} from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
    },
    {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    },
    {
        path: 'fornecedor',
        loadChildren: './fornecedor/fornecedor.module#FornecedorModule'
    },
    {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
    },
    {
        path: 'service/client',
        loadChildren: './service/clients.module#ClientsModule'
    },
    {
        path: 'uikit',
        loadChildren: './ui-kit/ui-kit.module#UIKitModule'
    },
    {
        path: 'pages',
        loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
    },
    {
        path: 'clients',
        loadChildren: './clients/clients.module#ClientsModule'
    }
];
