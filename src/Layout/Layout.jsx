import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import '../assets/css/style.css'


// eslint-disable-next-line react/prop-types
function Layout({children,headerTitle}) {
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <main className={'main'} id={'main'}>
                <div className="pagetitle">
                    <h1>{headerTitle}</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <section className={'section dashboard'}>
                    <div className={'row'}>
                        {children}
                    </div>
                </section>
            </main>


        </>
    )
}

export default Layout