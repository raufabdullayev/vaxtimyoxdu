'use client'

import { useState, useMemo } from 'react'

interface StatusCode {
  code: number
  name: string
  description: string
  category: string
}

const statusCodes: StatusCode[] = [
  // 1xx Informational
  { code: 100, name: 'Continue', description: 'The server has received the request headers, and the client should proceed to send the request body.', category: '1xx Informational' },
  { code: 101, name: 'Switching Protocols', description: 'The requester has asked the server to switch protocols and the server has agreed to do so.', category: '1xx Informational' },
  { code: 102, name: 'Processing', description: 'The server has received and is processing the request, but no response is available yet (WebDAV).', category: '1xx Informational' },
  { code: 103, name: 'Early Hints', description: 'Used to return some response headers before final HTTP message. Allows preloading resources.', category: '1xx Informational' },

  // 2xx Success
  { code: 200, name: 'OK', description: 'The request has succeeded. The meaning depends on the HTTP method: GET returns the resource, POST returns the result of the action.', category: '2xx Success' },
  { code: 201, name: 'Created', description: 'The request has been fulfilled, resulting in the creation of a new resource. Typically used after POST or PUT.', category: '2xx Success' },
  { code: 202, name: 'Accepted', description: 'The request has been accepted for processing, but the processing has not been completed. Used for async operations.', category: '2xx Success' },
  { code: 203, name: 'Non-Authoritative Information', description: 'The server successfully processed the request, but is returning information from another source.', category: '2xx Success' },
  { code: 204, name: 'No Content', description: 'The server successfully processed the request and is not returning any content. Common for DELETE requests.', category: '2xx Success' },
  { code: 205, name: 'Reset Content', description: 'The server successfully processed the request, asks the requester to reset its document view.', category: '2xx Success' },
  { code: 206, name: 'Partial Content', description: 'The server is delivering only part of the resource due to a range header sent by the client.', category: '2xx Success' },
  { code: 207, name: 'Multi-Status', description: 'Conveys information about multiple resources in situations where multiple status codes might be appropriate (WebDAV).', category: '2xx Success' },
  { code: 208, name: 'Already Reported', description: 'The members of a DAV binding have already been enumerated in a preceding part of the response (WebDAV).', category: '2xx Success' },
  { code: 226, name: 'IM Used', description: 'The server has fulfilled a GET request for the resource, using instance-manipulation applied to the current instance.', category: '2xx Success' },

  // 3xx Redirection
  { code: 300, name: 'Multiple Choices', description: 'Indicates multiple options for the resource from which the client may choose via agent-driven negotiation.', category: '3xx Redirection' },
  { code: 301, name: 'Moved Permanently', description: 'The resource has been permanently moved to a new URL. All future requests should use the new URL. Search engines update their links.', category: '3xx Redirection' },
  { code: 302, name: 'Found', description: 'The resource resides temporarily at a different URL. The client should continue to use the original URL for future requests.', category: '3xx Redirection' },
  { code: 303, name: 'See Other', description: 'The response to the request can be found at another URL using a GET method. Often used after POST to redirect to a result page.', category: '3xx Redirection' },
  { code: 304, name: 'Not Modified', description: 'The resource has not been modified since the version specified by the request headers. Client can use cached version.', category: '3xx Redirection' },
  { code: 305, name: 'Use Proxy', description: 'The requested resource must be accessed through the proxy given by the Location header. Deprecated due to security concerns.', category: '3xx Redirection' },
  { code: 307, name: 'Temporary Redirect', description: 'The request should be repeated at another URL, but future requests should still use the original URL. Method and body are not changed.', category: '3xx Redirection' },
  { code: 308, name: 'Permanent Redirect', description: 'The resource has been permanently moved. Like 301 but the method and body are not changed in the redirected request.', category: '3xx Redirection' },

  // 4xx Client Error
  { code: 400, name: 'Bad Request', description: 'The server cannot process the request due to malformed syntax, invalid parameters, or deceptive routing. Check your request format.', category: '4xx Client Error' },
  { code: 401, name: 'Unauthorized', description: 'Authentication is required and has failed or has not been provided. The client must authenticate itself to get the response.', category: '4xx Client Error' },
  { code: 402, name: 'Payment Required', description: 'Reserved for future use. Some APIs use it to indicate that a payment is required to access the resource.', category: '4xx Client Error' },
  { code: 403, name: 'Forbidden', description: 'The client does not have access rights to the content. Unlike 401, the client\'s identity is known to the server.', category: '4xx Client Error' },
  { code: 404, name: 'Not Found', description: 'The server cannot find the requested resource. The URL is not recognized. This is the most common error on the web.', category: '4xx Client Error' },
  { code: 405, name: 'Method Not Allowed', description: 'The request method is known by the server but is not supported by the target resource (e.g., POST on a read-only resource).', category: '4xx Client Error' },
  { code: 406, name: 'Not Acceptable', description: 'The server cannot produce a response matching the list of acceptable values defined in the request headers.', category: '4xx Client Error' },
  { code: 407, name: 'Proxy Authentication Required', description: 'The client must first authenticate itself with the proxy before the request can be processed.', category: '4xx Client Error' },
  { code: 408, name: 'Request Timeout', description: 'The server timed out waiting for the request. The client did not produce a request within the time the server was prepared to wait.', category: '4xx Client Error' },
  { code: 409, name: 'Conflict', description: 'The request could not be processed because of conflict in the current state of the resource (e.g., edit conflicts, duplicate entries).', category: '4xx Client Error' },
  { code: 410, name: 'Gone', description: 'The resource is no longer available and will not be available again. Unlike 404, this is permanent.', category: '4xx Client Error' },
  { code: 411, name: 'Length Required', description: 'The request did not specify the length of its content, which is required by the requested resource.', category: '4xx Client Error' },
  { code: 412, name: 'Precondition Failed', description: 'The server does not meet one of the preconditions specified in the request headers (e.g., If-Match).', category: '4xx Client Error' },
  { code: 413, name: 'Payload Too Large', description: 'The request entity is larger than limits defined by the server. The server might close the connection.', category: '4xx Client Error' },
  { code: 414, name: 'URI Too Long', description: 'The URI requested by the client is longer than the server is willing to interpret.', category: '4xx Client Error' },
  { code: 415, name: 'Unsupported Media Type', description: 'The media format of the requested data is not supported by the server (e.g., sending XML when JSON is expected).', category: '4xx Client Error' },
  { code: 416, name: 'Range Not Satisfiable', description: 'The client has asked for a portion of the file that the server cannot supply (Range header).', category: '4xx Client Error' },
  { code: 417, name: 'Expectation Failed', description: 'The server cannot meet the requirements of the Expect request-header field.', category: '4xx Client Error' },
  { code: 418, name: "I'm a Teapot", description: 'The server refuses the attempt to brew coffee with a teapot. An April Fools joke from RFC 2324, but widely known.', category: '4xx Client Error' },
  { code: 421, name: 'Misdirected Request', description: 'The request was directed at a server that is not able to produce a response.', category: '4xx Client Error' },
  { code: 422, name: 'Unprocessable Entity', description: 'The request was well-formed but could not be followed due to semantic errors (e.g., validation failures).', category: '4xx Client Error' },
  { code: 423, name: 'Locked', description: 'The resource that is being accessed is locked (WebDAV).', category: '4xx Client Error' },
  { code: 424, name: 'Failed Dependency', description: 'The request failed because it depended on another request that failed (WebDAV).', category: '4xx Client Error' },
  { code: 425, name: 'Too Early', description: 'The server is unwilling to risk processing a request that might be replayed (TLS early data).', category: '4xx Client Error' },
  { code: 426, name: 'Upgrade Required', description: 'The client should switch to a different protocol (e.g., TLS/1.0) as indicated in the Upgrade header.', category: '4xx Client Error' },
  { code: 428, name: 'Precondition Required', description: 'The origin server requires the request to be conditional to prevent lost updates.', category: '4xx Client Error' },
  { code: 429, name: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time (rate limiting). Retry after the specified delay.', category: '4xx Client Error' },
  { code: 431, name: 'Request Header Fields Too Large', description: 'The server is unwilling to process the request because its header fields are too large.', category: '4xx Client Error' },
  { code: 451, name: 'Unavailable For Legal Reasons', description: 'The resource is unavailable due to legal demands (e.g., censorship, court order). Named after Fahrenheit 451.', category: '4xx Client Error' },

  // 5xx Server Error
  { code: 500, name: 'Internal Server Error', description: 'The server has encountered a situation it does not know how to handle. A generic server-side error message.', category: '5xx Server Error' },
  { code: 501, name: 'Not Implemented', description: 'The request method is not supported by the server and cannot be handled. Required methods are GET and HEAD.', category: '5xx Server Error' },
  { code: 502, name: 'Bad Gateway', description: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.', category: '5xx Server Error' },
  { code: 503, name: 'Service Unavailable', description: 'The server is not ready to handle the request. Common causes: maintenance, overloaded. Usually temporary.', category: '5xx Server Error' },
  { code: 504, name: 'Gateway Timeout', description: 'The server, while acting as a gateway or proxy, did not get a response in time from the upstream server.', category: '5xx Server Error' },
  { code: 505, name: 'HTTP Version Not Supported', description: 'The HTTP version used in the request is not supported by the server.', category: '5xx Server Error' },
  { code: 506, name: 'Variant Also Negotiates', description: 'Transparent content negotiation for the request results in a circular reference.', category: '5xx Server Error' },
  { code: 507, name: 'Insufficient Storage', description: 'The server is unable to store the representation needed to complete the request (WebDAV).', category: '5xx Server Error' },
  { code: 508, name: 'Loop Detected', description: 'The server detected an infinite loop while processing the request (WebDAV).', category: '5xx Server Error' },
  { code: 510, name: 'Not Extended', description: 'Further extensions to the request are required for the server to fulfill it.', category: '5xx Server Error' },
  { code: 511, name: 'Network Authentication Required', description: 'The client needs to authenticate to gain network access (e.g., captive portals, Wi-Fi login pages).', category: '5xx Server Error' },
]

const categoryColors: Record<string, string> = {
  '1xx Informational': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  '2xx Success': 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  '3xx Redirection': 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  '4xx Client Error': 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
  '5xx Server Error': 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
}

const categoryBadgeColors: Record<string, string> = {
  '1xx Informational': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  '2xx Success': 'bg-green-500/20 text-green-700 dark:text-green-400',
  '3xx Redirection': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  '4xx Client Error': 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  '5xx Server Error': 'bg-red-500/20 text-red-700 dark:text-red-400',
}

const allCategories = [
  'All',
  '1xx Informational',
  '2xx Success',
  '3xx Redirection',
  '4xx Client Error',
  '5xx Server Error',
]

export default function HttpStatusCodes() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedCode, setExpandedCode] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return statusCodes.filter((sc) => {
      const matchesCategory =
        selectedCategory === 'All' || sc.category === selectedCategory
      const searchLower = search.toLowerCase()
      const matchesSearch =
        !search ||
        sc.code.toString().includes(search) ||
        sc.name.toLowerCase().includes(searchLower) ||
        sc.description.toLowerCase().includes(searchLower)
      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, StatusCode[]> = {}
    for (const sc of filtered) {
      if (!groups[sc.category]) groups[sc.category] = []
      groups[sc.category].push(sc)
    }
    return groups
  }, [filtered])

  const copyCode = async (code: number) => {
    await navigator.clipboard.writeText(code.toString())
    setCopied(code)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by code, name, or description..."
          className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search status codes"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {statusCodes.length} status codes
      </p>

      {/* Status codes list */}
      <div className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, codes]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                  categoryBadgeColors[category] || ''
                }`}
              >
                {category}
              </span>
              <span className="text-muted-foreground">({codes.length})</span>
            </h3>
            <div className="space-y-2">
              {codes.map((sc) => (
                <div
                  key={sc.code}
                  className={`rounded-lg border p-3 transition-colors cursor-pointer ${
                    categoryColors[sc.category] || ''
                  } hover:shadow-sm`}
                  onClick={() =>
                    setExpandedCode(expandedCode === sc.code ? null : sc.code)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setExpandedCode(
                        expandedCode === sc.code ? null : sc.code
                      )
                    }
                  }}
                  aria-expanded={expandedCode === sc.code}
                  aria-label={`${sc.code} ${sc.name}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono font-bold text-lg shrink-0">
                        {sc.code}
                      </span>
                      <span className="font-medium truncate">{sc.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyCode(sc.code)
                        }}
                        className="text-xs hover:underline opacity-70 hover:opacity-100"
                        aria-label={`Copy ${sc.code}`}
                      >
                        {copied === sc.code ? 'Copied!' : 'Copy'}
                      </button>
                      <span className="text-xs opacity-60">
                        {expandedCode === sc.code ? '[-]' : '[+]'}
                      </span>
                    </div>
                  </div>
                  {expandedCode === sc.code && (
                    <p className="mt-2 text-sm opacity-90 leading-relaxed">
                      {sc.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No status codes match your search.
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">About HTTP Status Codes</p>
        <p>
          HTTP response status codes indicate whether a specific HTTP request has been
          successfully completed. Responses are grouped in five classes: informational (1xx),
          successful (2xx), redirection (3xx), client error (4xx), and server error (5xx).
          Click on any status code to see its full description.
        </p>
      </div>
    </div>
  )
}
