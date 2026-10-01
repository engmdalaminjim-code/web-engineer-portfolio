import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Building,
  Sparkles,
  Scissors,
  Stethoscope,
  Hotel,
  X,
  Lock,
  ArrowRight,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DemoBanner } from '../DemoBanner';
import { BookingService, Appointment } from '../../../types/demos';
import { appStorage } from '../../../lib/storage';

interface BookingAppProps {
  onBackToPortfolio: () => void;
}

export const BookingApp: React.FC<BookingAppProps> = ({ onBackToPortfolio }) => {
  const [services, setServices] = useState<BookingService[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-02');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');

  // Booking Form State
  const [customerName, setCustomerName] = useState('Anika Tabassum');
  const [customerEmail, setCustomerEmail] = useState('anika.t@example.com');
  const [customerPhone, setCustomerPhone] = useState('+880 1812-987654');
  const [notes, setNotes] = useState('First time appointment.');
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Admin state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const load = () => {
      setServices(appStorage.getBookingServices());
      setAppointments(appStorage.getAppointments());
    };
    load();
    const u1 = appStorage.subscribe('booking_services', load);
    const u2 = appStorage.subscribe('appointments', load);
    return () => {
      u1();
      u2();
    };
  }, []);

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const newApt: Appointment = {
      id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName,
      customerEmail,
      customerPhone,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    appStorage.addAppointment(newApt);
    setConfirmedBooking(newApt);

    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <DemoBanner
        demoName="BookEasy Multi-Vertical Appointment Engine"
        adminCredentials={{ email: 'admin@bookeasy.com', pass: 'book123', role: 'Booking Coordinator' }}
        onBackToPortfolio={onBackToPortfolio}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Booking Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 sticky top-12 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span className="text-xl font-display font-bold text-white tracking-tight">BookEasy</span>
            <span className="text-xs text-slate-400 hidden sm:inline">· Salon, Clinic & Suites</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Booking Interface */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
            Zero Friction Scheduling
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Select Your Service & Reserve Your Slot
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time calendar verification prevents double-bookings. Instant digital confirmation slip issued upon submission.
          </p>
        </div>

        {/* Step 1: Select Service */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
            01. Available Specialized Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((srv) => {
              const isSelected = selectedService?.id === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="text-emerald-400 font-mono font-medium">{srv.category}</span>
                      <span>{srv.durationMinutes} mins</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{srv.name}</h3>
                    <p className="text-xs text-slate-400 mt-2">{srv.description}</p>
                    <div className="text-xs text-slate-300 mt-3">
                      Practitioner: <b className="text-white">{srv.practitioner}</b>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-base font-bold text-white font-mono">৳{srv.price}</span>
                    <button
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold ${
                        isSelected ? 'bg-emerald-400 text-black' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Service'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Date & Slot Picker + Booking Form */}
        {selectedService && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Calendar & Slot Picker */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                02. Select Preferred Date & Time
              </h2>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-01"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-2">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => {
                    const isTaken = appointments.some(
                      (a) => a.date === selectedDate && a.timeSlot === slot && a.status !== 'cancelled'
                    );
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        disabled={isTaken}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                          isTaken
                            ? 'bg-slate-950/60 text-slate-600 line-through cursor-not-allowed border border-slate-800/40'
                            : isSelected
                            ? 'bg-emerald-400 text-black font-bold border border-emerald-300'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-emerald-500/50'
                        }`}
                      >
                        {slot}
                        {isTaken && <span className="block text-[9px]">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Client Information Form */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                03. Client Details & Confirmation
              </h2>

              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Phone</label>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Special Notes / Requests</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Selected:</span>
                    <span className="text-white font-medium">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Schedule:</span>
                    <span className="text-emerald-400 font-mono">
                      {selectedDate} at {selectedSlot}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                    <span>Fee:</span>
                    <span className="text-emerald-400 font-mono">৳{selectedService.price}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment Reservation</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Slip Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-950 border border-emerald-500/50 rounded-3xl max-w-md w-full p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  Reservation Confirmed
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Booking #{confirmedBooking.id}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  A confirmation SMS & email have been recorded in the database.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="text-emerald-400">
                    {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact:</span>
                  <span className="text-white">{confirmedBooking.customerPhone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAdminLoggedIn ? (
              <div className="max-w-sm mx-auto py-8 text-center space-y-3">
                <Lock className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">BookEasy Admin Login</h3>
                <p className="text-xs text-slate-400">Credentials: admin@bookeasy.com / book123</p>
                <button
                  onClick={() => setIsAdminLoggedIn(true)}
                  className="w-full py-2.5 rounded-lg bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300"
                >
                  Auto Login
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">All Booked Appointments</h3>
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Logout
                  </button>
                </div>

                <div className="space-y-2">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>#{apt.id}</span>
                          <span className="text-slate-400 font-normal">· {apt.serviceName}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {apt.customerName} ({apt.customerPhone}) · {apt.date} @ {apt.timeSlot}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={apt.status}
                          onChange={(e) =>
                            appStorage.updateAppointmentStatus(apt.id, e.target.value as any)
                          }
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white capitalize"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
