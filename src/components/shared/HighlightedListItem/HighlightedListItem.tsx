import { FC, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion';

interface HighlightedListItemProps {
    callback: () => void;
    children: string;
}

const HighlightedListItem: FC<HighlightedListItemProps> = ({callback, children}) => {
    const ref = useRef(null)
    const inView = useInView(ref, {margin: '-45% 0px -45% 0px', amount: 0.2})

    useEffect(() => {
        if (inView) {
            callback()
        }
    }, [inView])

  return (
    <span ref={ref}>{children}</span>
  )
}

export default HighlightedListItem