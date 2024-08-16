import './App.css'

import Header from './containers/Header'
import Footer from './containers/Footer'
import MultiStepForm from './components/MultiStepForm'

function App() {
    const title = 'MultiStepForm App'

    return (
        <>
            <Header title={title} />
            <main className="container mx-auto my-10 px-4">
                <div className="container mx-auto p-4">
                    <MultiStepForm />
                </div>
                <div>
                    <p className="text-4xl text-center">
                        📞 Please do NOT spam my email 📞
                    </p>
                </div>
            </main>
            <Footer title={title} />
        </>
    )
}

export default App
