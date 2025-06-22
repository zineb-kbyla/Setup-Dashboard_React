import React, { useState, useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ComplaintsTable from "../components/Tables/ComplaintsTable";
import SearchBar from "../components/SearchBar";
import FilterByButton from "../components/FilterByButton";
import Pagination from "../components/Pagination";
import PageTitle from "../components/PageTitle";
import { faBox, faBug, faCreditCard, faUser, faCheckCircle, faCircleXmark, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComplaintActionModal from "../components/Modals/ComplaintActionModal";

const mockComplaints = [
  {
    id: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    userAvatar: require("../images/Avatars/Avatar1.png"),
    type: "Technical",
    status: "Open",
    originalMessage: "L'application se ferme de manière inattendue lorsque j'essaie de soumettre un formulaire.",
    reply: "Nous avons bien reçu votre réclamation et travaillons à la résolution du problème.",
    resolutionComment: "Le bug a été corrigé dans la dernière mise à jour.",
  },
  {
    id: 2,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    userAvatar: require("../images/Avatars/Avatar2.png"),
    type: "Billing",
    status: "Resolved",
    originalMessage: "J'ai été facturée deux fois pour mon abonnement ce mois-ci.",
    reply: "Nous sommes désolés pour la gêne occasionnée. Un remboursement a été effectué.",
    resolutionComment: "Double facturation remboursée le 12/05/2024.",
  },
  {
    id: 3,
    userName: "Alice Brown",
    userEmail: "alice@example.com",
    userAvatar: require("../images/Avatars/Avatar3.png"),
    type: "Account",
    status: "Resolved",
    originalMessage: "Je n'arrive pas à réinitialiser mon mot de passe malgré plusieurs tentatives.",
    reply: "Votre mot de passe a été réinitialisé avec succès. Veuillez vérifier votre email.",
    resolutionComment: "Réinitialisation effectuée et confirmée par l'utilisateur.",
  },
  {
    id: 4,
    userName: "Bob White",
    userEmail: "bob@example.com",
    userAvatar: require("../images/Avatars/Avatar1.png"),
    type: "Technical",
    status: "Resolved",
    originalMessage: "La fonctionnalité de recherche ne retourne aucun résultat même pour des termes courants.",
    reply: "Merci pour votre retour. Nous avons corrigé la recherche, merci de réessayer.",
    resolutionComment: "Recherche optimisée et validée par l'équipe technique.",
  },
  {
    id: 5,
    userName: "Sara Black",
    userEmail: "sara@example.com",
    userAvatar: require("../images/Avatars/Avatar2.png"),
    type: "Billing",
    status: "Open",
    originalMessage: "Je souhaite obtenir une facture détaillée pour mon dernier paiement.",
    reply: "Votre facture détaillée a été envoyée à votre adresse email.",
    resolutionComment: "Facture générée et envoyée le 10/05/2024.",
  }
];

const typeOptions = [
  { value: "Technical", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBug} className="text-blue-500" /> Technique</span> },
  { value: "Billing", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCreditCard} className="text-purple-500" /> Facturation</span> },
  { value: "Account", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUser} className="text-green-500" /> Compte</span> },
];

const statusOptions = [
  { value: "Open", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" /> Ouverte</span> },
  { value: "Resolved", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /> Résolue</span> },
];

export default function Complaints() {
  // Search, filter, and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filtering and searching logic
  const filteredComplaints = useMemo(() => {
    return mockComplaints
      .filter(
        (c) =>
          (!typeFilter || c.type === typeFilter) &&
          (!statusFilter || c.status === statusFilter)
      )
      .filter(
        (c) =>
          c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, typeFilter, statusFilter]);

  // Pagination logic
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedComplaints = filteredComplaints.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handler for opening modal
  const handleOpenModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalOpen(true);
  };

  // Handler for closing modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedComplaint(null);
  };

  // Handler for reply
  const handleReply = (replyText) => {
    // Implement reply logic here (API call, etc.)
    alert(`Réponse envoyée: ${replyText}`);
    setModalOpen(false);
  };

  // Handler for resolve
  const handleResolve = (resolutionComment) => {
    // Implement resolve logic here (API call, etc.)
    alert(`Réclamation marquée comme résolue. Commentaire: ${resolutionComment}`);
    setModalOpen(false);
  };

  return (
    <DashboardLayout>
      <PageTitle title={"All Complaints"} icon={faBox} />
      <div className="flex flex-col items-center justify-between md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            placeholder="Search complaints by user, type, or status..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex flex-wrap gap-1 items-center">
            <FilterByButton
              label="Type"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(0);
              }}
              options={typeOptions}
              onReset={() => setTypeFilter("")}
            />
            <FilterByButton
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              options={statusOptions}
              onReset={() => setStatusFilter("")}
            />
          </div>
          <Pagination
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={filteredComplaints.length}
          />
        </div>
      </div>
      <ComplaintsTable 
        complaints={paginatedComplaints} 
        onAction={handleOpenModal}
      />
      <ComplaintActionModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onReply={handleReply}
        onResolve={handleResolve}
        complaint={selectedComplaint}
      />
    </DashboardLayout>
  );
} 