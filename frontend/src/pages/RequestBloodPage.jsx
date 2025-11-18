import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export default function RequestBloodPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    hospital: '',
    bloodType: '',
    units: '',
    urgency: 'media',
    comments: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast({
      title: "Solicitud publicada",
      description: "Los donantes cercanos recibirán una notificación",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
      {/* Simple header */}
      <nav className="bg-primary py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="HemoApp" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-primary-foreground">
              Hemo<span className="font-normal">App</span>
            </span>
          </Link>
          <Link to="/">
            <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto py-12 px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-accent-foreground fill-accent-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">Solicitar Sangre</CardTitle>
            <CardDescription>Completa los datos del paciente que necesita donación</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nombre del Paciente</Label>
                <Input
                  id="patientName"
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital</Label>
                <Select value={formData.hospital} onValueChange={(value) => setFormData({ ...formData, hospital: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hospital Central de Formosa">Hospital Central de Formosa</SelectItem>
                    <SelectItem value="Hospital de Alta Complejidad (HAC)">Hospital de Alta Complejidad (HAC)</SelectItem>
                    <SelectItem value="Centro Provincial de Hemoterapia">Centro Provincial de Hemoterapia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Tipo de Sangre</Label>
                  <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Unidades necesarias</Label>
                  <Input
                    id="units"
                    type="number"
                    min="1"
                    required
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Nivel de urgencia</Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios adicionales</Label>
                <Textarea
                  id="comments"
                  rows={3}
                  placeholder="Información adicional..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                Publicar Solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
