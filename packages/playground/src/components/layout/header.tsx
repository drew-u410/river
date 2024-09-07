import {
    useRiver,
    useRiverAuthStatus,
    useRiverConnection,
    useSyncAgent,
} from '@river-build/react-sdk'
import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { RiverEnvSwitcher } from '../dialog/env-switcher'
import { Button } from '../ui/button'
import { UpdateMetadata } from '../form/metadata/update'

export const LayoutHeader = () => {
    const location = useLocation()
    const isAuthRoute = location.pathname.startsWith('/auth')
    const { isConnected } = useRiverConnection()

    return (
        <header className="flex justify-between border-b border-zinc-200 px-4 py-3">
            <h1 className="text-2xl font-bold">River Playground</h1>
            <div className="flex items-center gap-6">
                {!isAuthRoute && <RiverEnvSwitcher />}
                {isConnected && <Profile />}
            </div>
        </header>
    )
}

const Profile = () => {
    const { status } = useRiverAuthStatus()
    const { data: user } = useRiver((s) => s.user)
    const sync = useSyncAgent()
    const { spaceId, channelId } = useParams<{ spaceId: string; channelId: string }>()
    const [using, setUsing] = useState<'space' | 'channel'>(channelId ? 'channel' : 'space')

    return (
        <Sheet>
            <SheetTrigger>
                <img src="/pp1.png" alt="profile" className="h-8 w-8 rounded-full" />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <SheetHeader>
                        <SheetTitle>User</SheetTitle>
                    </SheetHeader>
                    <div className="flex gap-1">
                        <span className="text-sm font-medium">userId:</span>
                        <pre className="text-sm">{user.id}</pre>
                    </div>
                    <pre className="overflow-auto whitespace-pre-wrap text-sm">{status}</pre>
                    <pre className="overflow-auto whitespace-pre-wrap text-sm">
                        {sync.riverConnection.client?.rpcClient.url}
                    </pre>
                </div>
                {(spaceId || (spaceId && channelId)) && (
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center gap-2">
                            <Button
                                variant={using === 'space' ? 'default' : 'outline'}
                                onClick={() => setUsing('space')}
                            >
                                Use Space
                            </Button>
                            {channelId && (
                                <Button
                                    variant={using === 'channel' ? 'default' : 'outline'}
                                    onClick={() => setUsing('channel')}
                                >
                                    Use Channel
                                </Button>
                            )}
                        </div>
                        <UpdateMetadata spaceId={spaceId} use={using} />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}