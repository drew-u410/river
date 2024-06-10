// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file protocol.proto (package river, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddEventRequest, AddEventResponse, AddStreamToSyncRequest, AddStreamToSyncResponse, CancelSyncRequest, CancelSyncResponse, CreateStreamRequest, CreateStreamResponse, GetLastMiniblockHashRequest, GetLastMiniblockHashResponse, GetMiniblocksRequest, GetMiniblocksResponse, GetStreamExRequest, GetStreamExResponse, GetStreamRequest, GetStreamResponse, InfoRequest, InfoResponse, PingSyncRequest, PingSyncResponse, RemoveStreamFromSyncRequest, RemoveStreamFromSyncResponse, SyncStreamsRequest, SyncStreamsResponse } from "./protocol_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service river.StreamService
 */
export const StreamService = {
  typeName: "river.StreamService",
  methods: {
    /**
     * @generated from rpc river.StreamService.CreateStream
     */
    createStream: {
      name: "CreateStream",
      I: CreateStreamRequest,
      O: CreateStreamResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.GetStream
     */
    getStream: {
      name: "GetStream",
      I: GetStreamRequest,
      O: GetStreamResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.GetStreamEx
     */
    getStreamEx: {
      name: "GetStreamEx",
      I: GetStreamExRequest,
      O: GetStreamExResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc river.StreamService.GetMiniblocks
     */
    getMiniblocks: {
      name: "GetMiniblocks",
      I: GetMiniblocksRequest,
      O: GetMiniblocksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.GetLastMiniblockHash
     */
    getLastMiniblockHash: {
      name: "GetLastMiniblockHash",
      I: GetLastMiniblockHashRequest,
      O: GetLastMiniblockHashResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.AddEvent
     */
    addEvent: {
      name: "AddEvent",
      I: AddEventRequest,
      O: AddEventResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.SyncStreams
     */
    syncStreams: {
      name: "SyncStreams",
      I: SyncStreamsRequest,
      O: SyncStreamsResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc river.StreamService.AddStreamToSync
     */
    addStreamToSync: {
      name: "AddStreamToSync",
      I: AddStreamToSyncRequest,
      O: AddStreamToSyncResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.CancelSync
     */
    cancelSync: {
      name: "CancelSync",
      I: CancelSyncRequest,
      O: CancelSyncResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.RemoveStreamFromSync
     */
    removeStreamFromSync: {
      name: "RemoveStreamFromSync",
      I: RemoveStreamFromSyncRequest,
      O: RemoveStreamFromSyncResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.Info
     */
    info: {
      name: "Info",
      I: InfoRequest,
      O: InfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc river.StreamService.PingSync
     */
    pingSync: {
      name: "PingSync",
      I: PingSyncRequest,
      O: PingSyncResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
