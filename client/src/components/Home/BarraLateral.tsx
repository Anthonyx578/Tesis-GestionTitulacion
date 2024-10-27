"use client"

import useMenu from "@/hooks/useMenu"

export default function Components_BarraLateral({role}:{role:string}){
    const {valor} = useMenu()

    return(
        <div className="w-3.50/12 h-full bg-slate-300 text-black">
            {valor && (
                <div >Me veo</div>
            )}            
            {role}
        </div>
    )
}