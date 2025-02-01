import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/Routes';
import LoadingLayout from './components/Layout/LoadingLayout';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={
              Page !== null ? (
                <Layout Children={<Page />}>
                </Layout>
              ) : (
                <Layout />
              )
            }
            />
          })}
        </Routes>
        <LoadingLayout />
      </div>
    </Router>
  );
}
export default App;
