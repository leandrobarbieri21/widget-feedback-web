import { useState } from 'react'

import { TypeStep } from './Steps/TypeStep'
import { ContentStep } from './Steps/ContentStep'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { SuccessStep } from './Steps/SuccessStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problem',
    image: {
      source: bugImageUrl,
      alt: 'Image of a bug',
    },
  },
  IDEA: {
    title: 'Idea',
    image: {
      source: ideaImageUrl,
      alt: 'Image of an Idea',
    },
  },
  OTHER: {
    title: 'Other',
    image: {
      source: thoughtImageUrl,
      alt: 'Image of a thought balloon',
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <SuccessStep onRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <TypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <ContentStep
              feedbackType={feedbackType}
              onFeedbackSent={() => setFeedbackSent(true)}
              onRestartFeedback={handleRestartFeedback}
            />
          )}
        </>
      )}
    </div>
  )
}
