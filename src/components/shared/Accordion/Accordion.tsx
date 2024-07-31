import { FC } from 'react'
import { AccordionContent } from '../../../types/types'
import styles from './Accordion.module.css'
import AccordionItem from './AccordionItem';

interface AccordionProps {
    content: AccordionContent[];
}

const Accordion: FC<AccordionProps> = ({content}) => {
  return (
    <div className={styles.accordion}>
        {content.map((item, index) => (
            <AccordionItem title={item.title} content={item.content} key={index}/>
        ))}
    </div>
  )
}

export default Accordion