import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextToSpeech from '../TextToSpeech'

// Mock SpeechSynthesis API
const mockSpeak = vi.fn()
const mockCancel = vi.fn()
const mockPause = vi.fn()
const mockResume = vi.fn()
const mockGetVoices = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

// Use a real class so `new SpeechSynthesisUtterance()` works in jsdom
class MockUtterance {
  text: string
  voice: unknown
  rate: number
  pitch: number
  volume: number
  onstart: unknown
  onend: unknown
  onerror: unknown

  constructor(text?: string) {
    this.text = text || ''
    this.voice = null
    this.rate = 1
    this.pitch = 1
    this.volume = 1
    this.onstart = null
    this.onend = null
    this.onerror = null
  }
}

function setupSpeechSynthesisMock() {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: mockSpeak,
      cancel: mockCancel,
      pause: mockPause,
      resume: mockResume,
      getVoices: mockGetVoices,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    },
    writable: true,
    configurable: true,
  })

  vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance)
}

const defaultVoices = [
  {
    name: 'English Voice',
    lang: 'en-US',
    default: true,
    voiceURI: 'english-voice-uri',
    localService: true,
  },
  {
    name: 'Spanish Voice',
    lang: 'es-ES',
    default: false,
    voiceURI: 'spanish-voice-uri',
    localService: true,
  },
]

describe('TextToSpeech', () => {
  beforeEach(() => {
    mockSpeak.mockClear()
    mockCancel.mockClear()
    mockPause.mockClear()
    mockResume.mockClear()
    mockGetVoices.mockReset()
    mockAddEventListener.mockClear()
    mockRemoveEventListener.mockClear()

    mockGetVoices.mockReturnValue(defaultVoices)
    setupSpeechSynthesisMock()
  })

  it('renders the component with all required elements', () => {
    render(<TextToSpeech />)

    expect(screen.getByText('Text to Read')).toBeInTheDocument()
    expect(screen.getByText('Speak')).toBeInTheDocument()
    expect(screen.getByText('Voice')).toBeInTheDocument()
  })

  it('renders the textarea with correct placeholder', () => {
    render(<TextToSpeech />)

    expect(
      screen.getByPlaceholderText('Enter the text you want to hear spoken aloud...')
    ).toBeInTheDocument()
  })

  it('renders speed, pitch, and volume controls', () => {
    render(<TextToSpeech />)

    expect(screen.getByText(/Speed:/)).toBeInTheDocument()
    expect(screen.getByText(/Pitch:/)).toBeInTheDocument()
    expect(screen.getByText(/Volume:/)).toBeInTheDocument()

    expect(screen.getByLabelText('Speech rate')).toBeInTheDocument()
    expect(screen.getByLabelText('Speech pitch')).toBeInTheDocument()
    expect(screen.getByLabelText('Speech volume')).toBeInTheDocument()
  })

  it('renders word and character count stats', () => {
    render(<TextToSpeech />)

    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Est. Duration')).toBeInTheDocument()
    expect(screen.getByText('Voices')).toBeInTheDocument()
  })

  it('shows initial word count of 0', () => {
    render(<TextToSpeech />)

    const wordsLabel = screen.getByText('Words')
    const container = wordsLabel.parentElement!
    const valueEl = container.querySelector('[class*="font-bold"]') as HTMLElement
    expect(valueEl?.textContent).toBe('0')
  })

  it('updates word count when text is entered', () => {
    render(<TextToSpeech />)

    const textarea = screen.getByLabelText('Text to speak')
    fireEvent.change(textarea, { target: { value: 'Hello beautiful world' } })

    const wordsLabel = screen.getByText('Words')
    const container = wordsLabel.parentElement!
    const valueEl = container.querySelector('[class*="font-bold"]') as HTMLElement
    expect(valueEl?.textContent).toBe('3')
  })

  it('updates character count when text is entered', () => {
    render(<TextToSpeech />)

    const textarea = screen.getByLabelText('Text to speak')
    fireEvent.change(textarea, { target: { value: 'Hello' } })

    const charsLabel = screen.getByText('Characters')
    const container = charsLabel.parentElement!
    const valueEl = container.querySelector('[class*="font-bold"]') as HTMLElement
    expect(valueEl?.textContent).toBe('5')
  })

  it('shows error when Speak is clicked with empty text', () => {
    render(<TextToSpeech />)

    fireEvent.click(screen.getByText('Speak'))

    expect(screen.getByText('Please enter some text to read aloud')).toBeInTheDocument()
  })

  it('calls speechSynthesis.speak when Speak button is clicked with text', () => {
    render(<TextToSpeech />)

    const textarea = screen.getByLabelText('Text to speak')
    fireEvent.change(textarea, { target: { value: 'Hello world' } })

    fireEvent.click(screen.getByText('Speak'))

    expect(mockCancel).toHaveBeenCalled()
    expect(mockSpeak).toHaveBeenCalled()
  })

  it('shows Load Sample button and loads sample text', () => {
    render(<TextToSpeech />)

    fireEvent.click(screen.getByText('Load Sample'))

    const textarea = screen.getByLabelText('Text to speak') as HTMLTextAreaElement
    expect(textarea.value).toContain('Text to Speech')
    expect(textarea.value).toContain('Web Speech API')
  })

  it('renders the voice selector dropdown', () => {
    render(<TextToSpeech />)

    const voiceSelect = screen.getByLabelText('Select voice')
    expect(voiceSelect).toBeInTheDocument()
  })

  it('shows not supported message when Speech API is unavailable', () => {
    // Remove speechSynthesis from window
    Object.defineProperty(window, 'speechSynthesis', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    render(<TextToSpeech />)

    expect(screen.getByText('Speech Synthesis Not Supported')).toBeInTheDocument()
  })

  it('shows Clear button only when text is entered and not speaking', () => {
    render(<TextToSpeech />)

    expect(screen.queryByText('Clear')).not.toBeInTheDocument()

    const textarea = screen.getByLabelText('Text to speak')
    fireEvent.change(textarea, { target: { value: 'Some text' } })

    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('clears text when Clear button is clicked', () => {
    render(<TextToSpeech />)

    const textarea = screen.getByLabelText('Text to speak')
    fireEvent.change(textarea, { target: { value: 'Some text' } })

    fireEvent.click(screen.getByText('Clear'))

    expect(textarea).toHaveValue('')
  })
})
