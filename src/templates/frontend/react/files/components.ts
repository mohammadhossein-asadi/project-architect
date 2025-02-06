export const getComponentFiles = () => [
  {
    path: 'src/components/Layout/index.tsx',
    content: `import { FC, ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}`
  },
  {
    path: 'src/components/Navbar/index.tsx',
    content: `import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold">
            Logo
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}`
  },
  {
    path: 'src/components/Footer/index.tsx',
    content: `export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}`
  }
];