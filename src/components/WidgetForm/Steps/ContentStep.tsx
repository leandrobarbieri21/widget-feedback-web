import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'

import { CloseButton } from '../../CloseButton'
import { ScreenshotButton } from '../ScreenshotButton'
import { Loading } from '../../Loading'

import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../lib/api'

type ContentStepProps = {
  feedbackType: FeedbackType
  onFeedbackSent: () => void
  onRestartFeedback: () => void
}

export function ContentStep({
  feedbackType,
  onFeedbackSent,
  onRestartFeedback,
}: ContentStepProps) {
  const [comment, setComment] = useState<string | null>(null)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    })

    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          title="Back to feedback type"
          onClick={onRestartFeedback}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] rounded-md text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Please, tell us in detail what is happening..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />

          <button
            type="submit"
            disabled={isSendingFeedback || !comment || comment?.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex items-center justify-center text-sm hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500 disabled:hover:cursor-not-allowed"
          >
            {isSendingFeedback ? <Loading /> : 'Send feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
