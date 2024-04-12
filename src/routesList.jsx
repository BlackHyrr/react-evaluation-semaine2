import Home from "./pages/Home"
import Page404 from "./pages/Errors/Page404"
import DetailPost from "./pages/Posts/DetailPost/DetailPost"
import PostForm from "./pages/Posts/PostForm/PostForm"

const RoutesList = [
    { path: '/', component: <Home />, name: "Home", label: 'Home', header: true },
    { path: '/add-post/:id?', component: <PostForm />, name: "FormPost", label: 'Add a post', header: true },
    { path: '/detail-post/:postId', component: <DetailPost />, name: "DetailPost", label: 'Detail of post',header: false },
    { path: '*', component: <Page404 />, name: "Error404", header: false },
]

export default RoutesList