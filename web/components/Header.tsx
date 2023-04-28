// components/Header.js

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center">
        <img src="/favicon.ico" alt="RATVS" className="w-8 h-8 mr-2" />
        <div>
          <a className="text-xl font-bold">RTUVS</a>
        </div>
      </div>
    </header>
  )
}
