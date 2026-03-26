import { Header } from '@/components/Header'
import { CartSidebar } from '@/components/CartSidebar'
import { Home } from '@/pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Home />
      <CartSidebar />

      {/* Футер */}
      <footer className="bg-brand-dark text-white/70 text-sm py-8 mt-4">
        <div className="container text-center space-y-2">
          <p className="font-semibold text-white text-base">👑 Royal Kids</p>
          <p>г. Козьмодемьянск, ул. Советская, д. 1</p>
          <p>
            <a href="tel:+78362000000" className="hover:text-white transition-colors">
              +7 (836-2) 00-00-00
            </a>
            {' · '}
            <a
              href="https://vk.com/royal_rest_kuzma"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              ВКонтакте
            </a>
          </p>
          <p className="text-white/40 text-xs pt-2">
            © {new Date().getFullYear()} Royal Kids. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
