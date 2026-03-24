import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoToGif from '../VideoToGif'

describe('VideoToGif', () => {
  it('renders file upload input', () => {
    render(<VideoToGif />)
    expect(screen.getByLabelText('Upload video file')).toBeInTheDocument()
  })

  it('renders upload instructions', () => {
    render(<VideoToGif />)
    expect(screen.getByText(/Max 100 MB/)).toBeInTheDocument()
  })

  it('shows error for non-video file', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement

    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    Object.defineProperty(input, 'files', { value: [file] })
    fireEvent.change(input)
    expect(screen.getByText('Please select a video file.')).toBeInTheDocument()
  })

  it('shows error for oversized file', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement

    const largeFile = new File(['x'], 'big.mp4', { type: 'video/mp4' })
    Object.defineProperty(largeFile, 'size', { value: 200 * 1024 * 1024 })
    Object.defineProperty(input, 'files', { value: [largeFile] })
    fireEvent.change(input)
    expect(screen.getByText('File size must be under 100 MB.')).toBeInTheDocument()
  })

  it('accepts valid video file', () => {
    // Mock URL.createObjectURL
    const mockUrl = 'blob:test-url'
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockUrl)

    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement

    const file = new File(['video-data'], 'test.mp4', { type: 'video/mp4' })
    Object.defineProperty(input, 'files', { value: [file] })
    fireEvent.change(input)

    // No error should be shown
    expect(screen.queryByText('Please select a video file.')).not.toBeInTheDocument()
    expect(screen.queryByText('File size must be under 100 MB.')).not.toBeInTheDocument()

    vi.restoreAllMocks()
  })
})
