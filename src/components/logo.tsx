import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Image
        src="/logo.svg"
        alt="Ypomoni Logo"
        width={80}
        height={80}
        priority
        className="h-10 w-10 md:h-20 md:w-20 object-contain"
      />
      <span className="text-lg md:text-3xl font-normal tracking-wide text-pink-700">
        YPOMONI
      </span>
    </div>
  )
}
