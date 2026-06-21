import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Ypomoni Logo"
        width={80}
        height={80}
        priority
        className="h-9 w-9 object-contain md:h-10 md:w-10"
      />
      <span className="text-base font-semibold tracking-tight text-neutral-950 md:text-lg">
        YPOMONI
      </span>
    </div>
  )
}
