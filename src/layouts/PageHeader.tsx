import { Menu } from 'lucide-react'
import logo from '../assets/Logo.png'
import Button from '../components/Button'

export default function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="h-6" />
        </a>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}
