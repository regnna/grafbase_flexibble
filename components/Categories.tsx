"use client"
import { catergoryFilters } from '@/constant';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';

const Categories = () => {
    const router=useRouter();
    const pathName=usePathname();
    const searchParams =useSearchParams();

    const catergory=searchParams.get('catergory');
    const handleTags=(filter:string)=>{
        router.push(`${pathName}?catergory=${filter}`)
    }

  return (
   <div className='flexBetween w-full gap-5 flex-wrap'>
    <ul className='flex gap-3 overflow-auto'>
        {catergoryFilters.map((filter)=>(
            <button
            key={filter}
            type='button'
            onClick={()=>handleTags(filter)}
            className={`${catergory===filter?'bg-light-white font-medium':'font-normal'}px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >{filter}
            </button>
        ))}
    </ul>

   </div>
  )
}

export default Categories