'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface GitCommand {
  category: string
  name: string
  template: string
  args: { name: string; placeholder: string; defaultValue?: string }[]
  description: string
}

const GIT_COMMANDS: GitCommand[] = [
  { category: 'Basic', name: 'Clone', template: 'git clone {url}', args: [{ name: 'url', placeholder: 'https://github.com/user/repo.git' }], description: 'Clone a repository' },
  { category: 'Basic', name: 'Init', template: 'git init', args: [], description: 'Initialize a new repository' },
  { category: 'Basic', name: 'Status', template: 'git status', args: [], description: 'Show working tree status' },
  { category: 'Branch', name: 'Create Branch', template: 'git checkout -b {branch}', args: [{ name: 'branch', placeholder: 'feature/new-feature' }], description: 'Create and switch to new branch' },
  { category: 'Branch', name: 'Switch Branch', template: 'git checkout {branch}', args: [{ name: 'branch', placeholder: 'main' }], description: 'Switch to existing branch' },
  { category: 'Branch', name: 'Delete Branch', template: 'git branch -d {branch}', args: [{ name: 'branch', placeholder: 'feature/old' }], description: 'Delete a local branch' },
  { category: 'Branch', name: 'List Branches', template: 'git branch -a', args: [], description: 'List all branches' },
  { category: 'Commit', name: 'Add All', template: 'git add .', args: [], description: 'Stage all changes' },
  { category: 'Commit', name: 'Add File', template: 'git add {file}', args: [{ name: 'file', placeholder: 'path/to/file.ts' }], description: 'Stage specific file' },
  { category: 'Commit', name: 'Commit', template: 'git commit -m "{message}"', args: [{ name: 'message', placeholder: 'feat: add new feature' }], description: 'Commit staged changes' },
  { category: 'Commit', name: 'Amend', template: 'git commit --amend -m "{message}"', args: [{ name: 'message', placeholder: 'updated message' }], description: 'Amend last commit' },
  { category: 'Remote', name: 'Push', template: 'git push origin {branch}', args: [{ name: 'branch', placeholder: 'main' }], description: 'Push to remote' },
  { category: 'Remote', name: 'Pull', template: 'git pull origin {branch}', args: [{ name: 'branch', placeholder: 'main' }], description: 'Pull from remote' },
  { category: 'Remote', name: 'Fetch', template: 'git fetch --all', args: [], description: 'Fetch all remotes' },
  { category: 'Remote', name: 'Add Remote', template: 'git remote add {name} {url}', args: [{ name: 'name', placeholder: 'origin' }, { name: 'url', placeholder: 'https://github.com/user/repo.git' }], description: 'Add remote' },
  { category: 'Stash', name: 'Stash Save', template: 'git stash save "{message}"', args: [{ name: 'message', placeholder: 'work in progress' }], description: 'Stash changes' },
  { category: 'Stash', name: 'Stash Pop', template: 'git stash pop', args: [], description: 'Apply and remove stash' },
  { category: 'Stash', name: 'Stash List', template: 'git stash list', args: [], description: 'List stashes' },
  { category: 'Log', name: 'Log', template: 'git log --oneline -n {count}', args: [{ name: 'count', placeholder: '10' }], description: 'Show recent commits' },
  { category: 'Log', name: 'Diff', template: 'git diff {file}', args: [{ name: 'file', placeholder: '', defaultValue: '' }], description: 'Show changes' },
  { category: 'Reset', name: 'Soft Reset', template: 'git reset --soft HEAD~{count}', args: [{ name: 'count', placeholder: '1' }], description: 'Undo commits, keep changes staged' },
  { category: 'Reset', name: 'Hard Reset', template: 'git reset --hard HEAD~{count}', args: [{ name: 'count', placeholder: '1' }], description: 'Undo commits and changes' },
  { category: 'Tag', name: 'Create Tag', template: 'git tag -a {tag} -m "{message}"', args: [{ name: 'tag', placeholder: 'v1.0.0' }, { name: 'message', placeholder: 'Release 1.0.0' }], description: 'Create annotated tag' },
  { category: 'Tag', name: 'Push Tags', template: 'git push --tags', args: [], description: 'Push all tags' },
]

export default function GitCommandGenerator() {
  const t = useTranslations('toolUI')
  const [selectedCmd, setSelectedCmd] = useState<GitCommand>(GIT_COMMANDS[0])
  const [argValues, setArgValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [filterCat, setFilterCat] = useState('All')

  const categories = ['All', ...Array.from(new Set(GIT_COMMANDS.map((c) => c.category)))]

  const filteredCommands = filterCat === 'All'
    ? GIT_COMMANDS
    : GIT_COMMANDS.filter((c) => c.category === filterCat)

  const generatedCommand = selectedCmd.args.reduce((cmd, arg) => {
    const value = argValues[arg.name] || arg.placeholder || arg.defaultValue || ''
    return cmd.replace(`{${arg.name}}`, value)
  }, selectedCmd.template)

  const copy = async () => {
    await navigator.clipboard.writeText(generatedCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filterCat === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
        {filteredCommands.map((cmd) => (
          <button
            key={cmd.name}
            onClick={() => { setSelectedCmd(cmd); setArgValues({}) }}
            className={`p-2 rounded-lg text-left text-sm transition-colors ${
              selectedCmd.name === cmd.name
                ? 'bg-primary/10 ring-1 ring-primary'
                : 'border hover:bg-accent'
            }`}
          >
            <div className="font-medium">{cmd.name}</div>
            <div className="text-xs text-muted-foreground">{cmd.description}</div>
          </button>
        ))}
      </div>

      {selectedCmd.args.length > 0 && (
        <div className="space-y-2">
          {selectedCmd.args.map((arg) => (
            <div key={arg.name}>
              <label className="block text-sm font-medium mb-1 capitalize">{arg.name}</label>
              <input
                type="text"
                placeholder={arg.placeholder}
                value={argValues[arg.name] || ''}
                onChange={(e) => setArgValues((prev) => ({ ...prev, [arg.name]: e.target.value }))}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border bg-primary/5 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Generated Command</span>
          <button
            onClick={copy}
            className="text-xs text-primary hover:underline"
          >
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <code className="block text-sm font-mono break-all">{generatedCommand}</code>
      </div>
    </div>
  )
}
