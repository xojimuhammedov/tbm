import { Dialog, DialogContent, DialogHeader, DialogTitle } from "dgz-ui/dialog";
import { OrderApplication } from "../interfaces/order.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { ScrollArea } from "dgz-ui/scroll-area";

interface ApplicationDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication;
}

const ApplicationDocumentView = ({
                                   open,
                                   onOpenChange,
                                   document,
                                 }: ApplicationDocumentViewProps) => {
  if (!document) return null;

  const is1745 = document.code === "17-45";
  const is1754 = document.code === "17-54";

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              Farmoyish #{document.document_index} ({document.code})
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-100px)]">
            <div className="p-6 bg-white text-black space-y-6">{/* ... rest of the content ... */}
              {/* Header */}
              <div className="text-center">
                <div className="text-5xl font-bold tracking-wider mb-2">TBM</div>
                <p className="text-sm italic">
                  "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika
                  markazi" davlat unitar korxonasi
                </p>
              </div>

              <div className="text-center">
                <h1 className="text-xl font-bold uppercase">Farmoyishi</h1>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Sana:</strong> {dateFormatter(document.order_date, DATE)}
                </div>
                <div className="text-center">
                  <strong>Kod:</strong> {document.code}
                </div>
                <div className="text-right">
                  <strong>Raqam:</strong> {document.document_index}
                </div>
              </div>

              {/* To & Copy */}
              <div className="space-y-2">
                <div>
                  <strong>Kimga:</strong>
                  <ul className="ml-4 mt-1">
                    {document.to?.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                {document.copy && document.copy.length > 0 && (
                    <div>
                      <strong>Nusxasi:</strong>
                      <ul className="ml-4 mt-1">
                        {document.copy.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                )}
              </div>

              {/* 17-45 Content */}
              {is1745 && document.payload && "basic" in document.payload && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <strong>Tashkilot:</strong> {document.payload.basic.organization_name}
                        </div>
                        <div>
                          <strong>Ariza raqami:</strong> {document.payload.basic.request_number}
                        </div>
                        <div>
                          <strong>Ariza sanasi:</strong>{" "}
                          {dateFormatter(document.payload.basic.request_date, DATE)}
                        </div>
                        <div>
                          <strong>Muddat:</strong>{" "}
                          {dateFormatter(document.payload.basic.deadline, DATE)}
                        </div>
                        <div>
                          <strong>Signal darajasi:</strong> {document.payload.basic.signal_level}
                        </div>
                        <div>
                          <strong>Amallar:</strong>{" "}
                          {document.payload.basic.actions?.join(", ")}
                        </div>
                      </div>
                      {document.payload.basic.justification && (
                          <div className="mt-3">
                            <strong>Asoslash:</strong>
                            <p className="mt-1">{document.payload.basic.justification}</p>
                          </div>
                      )}
                    </div>

                    {/* Create Flow IDs */}
                    {"create" in document.payload &&
                        document.payload.create?.flow_ids &&
                        document.payload.create.flow_ids.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">Tashkil etilgan oqimlar:</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm">
                                  <thead className="bg-gray-100">
                                  <tr>
                                    <th className="border p-2">Code</th>
                                    <th className="border p-2">Point A</th>
                                    <th className="border p-2">Point B</th>
                                    <th className="border p-2">Device A</th>
                                    <th className="border p-2">Device B</th>
                                    <th className="border p-2">Port A</th>
                                    <th className="border p-2">Port B</th>
                                    <th className="border p-2">Signal</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {document.payload.create.flow_ids.map((flow, idx) => (
                                      <tr key={idx}>
                                        <td className="border p-2">{flow.code}</td>
                                        <td className="border p-2">{flow.point_a}</td>
                                        <td className="border p-2">{flow.point_b}</td>
                                        <td className="border p-2">{flow.device_a}</td>
                                        <td className="border p-2">{flow.device_b}</td>
                                        <td className="border p-2">{flow.port_a}</td>
                                        <td className="border p-2">{flow.port_b}</td>
                                        <td className="border p-2">{flow.signal_level}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        )}

                    {/* Update - Channels */}
                    {"update" in document.payload &&
                        document.payload.update?.channels &&
                        document.payload.update.channels.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">Ko'chirilgan kanallar:</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm">
                                  <thead className="bg-gray-100">
                                  <tr>
                                    <th className="border p-2">Eski (Old)</th>
                                    <th className="border p-2">Yangi (New)</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {document.payload.update.channels.map((channel, idx) => (
                                      <tr key={idx}>
                                        <td className="border p-2">{channel.old}</td>
                                        <td className="border p-2">{channel.new}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        )}

                    {/* Update - Flows */}
                    {"update" in document.payload &&
                        document.payload.update?.flows &&
                        document.payload.update.flows.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">Ko'chirilgan oqimlar:</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm">
                                  <thead className="bg-gray-100">
                                  <tr>
                                    <th className="border p-2">Code</th>
                                    <th className="border p-2">Point A</th>
                                    <th className="border p-2">Point B</th>
                                    <th className="border p-2">Device A</th>
                                    <th className="border p-2">Device B</th>
                                    <th className="border p-2">Port A</th>
                                    <th className="border p-2">Port B</th>
                                    <th className="border p-2">Signal</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {document.payload.update.flows.map((flow, idx) => (
                                      <tr key={idx}>
                                        <td className="border p-2">{flow.code}</td>
                                        <td className="border p-2">{flow.point_a}</td>
                                        <td className="border p-2">{flow.point_b}</td>
                                        <td className="border p-2">{flow.device_a}</td>
                                        <td className="border p-2">{flow.device_b}</td>
                                        <td className="border p-2">{flow.port_a}</td>
                                        <td className="border p-2">{flow.port_b}</td>
                                        <td className="border p-2">{flow.signal_level}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        )}

                    {/* Delete */}
                    {"delete" in document.payload &&
                        document.payload.delete?.elements &&
                        document.payload.delete.elements.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">O'chirilgan elementlar:</h3>
                              <div className="flex flex-wrap gap-2">
                                {document.payload.delete.elements.map((element, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-red-100 text-red-700 px-3 py-1 rounded"
                                    >
                                                    {element}
                                                </span>
                                ))}
                              </div>
                            </div>
                        )}
                  </div>
              )}

              {/* 17-54 Content */}
              {is1754 && document.payload && "basic" in document.payload && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Tashkilot:</strong> {document.payload.basic.organization_name}
                        </div>
                        <div>
                          <strong>Ariza raqami:</strong> {document.payload.basic.request_number}
                        </div>
                        <div>
                          <strong>Ariza sanasi:</strong>{" "}
                          {dateFormatter(document.payload.basic.request_date, DATE)}
                        </div>
                        {document.payload.basic.justification && (
                            <div>
                              <strong>Asoslash:</strong>
                              <p className="mt-1">{document.payload.basic.justification}</p>
                            </div>
                        )}
                        {document.payload.basic.context && (
                            <div>
                              <strong>Kontekst:</strong>
                              <p className="mt-1">{document.payload.basic.context}</p>
                            </div>
                        )}
                      </div>
                    </div>

                    {/* Events Table */}
                    {"events" in document.payload &&
                        document.payload.events &&
                        document.payload.events.length > 0 && (
                            <div>
                              <h3 className="font-bold mb-2">Tadbirlar:</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm">
                                  <thead className="bg-gray-100">
                                  <tr>
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Manzil</th>
                                    <th className="border p-2">Tezlik/Vlan</th>
                                    <th className="border p-2">Jadval</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {document.payload.events.map((event, idx) => (
                                      <tr key={idx}>
                                        <td className="border p-2 text-center">{idx + 1}</td>
                                        <td className="border p-2">{event.location}</td>
                                        <td className="border p-2">
                                          {event.connection_spec}
                                        </td>
                                        <td className="border p-2">
                                          {event.schedule?.map((sched, schedIdx) => (
                                              <div
                                                  key={schedIdx}
                                                  className="mb-2 pb-2 border-b last:border-b-0"
                                              >
                                                <div>
                                                  📅 {dateFormatter(sched.date, DATE)}
                                                </div>
                                                <div>⏰ {sched.duration}</div>
                                                <div>🎯 {sched.event_type}</div>
                                              </div>
                                          ))}
                                        </td>
                                      </tr>
                                  ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        )}
                  </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
  );
};

export default ApplicationDocumentView;